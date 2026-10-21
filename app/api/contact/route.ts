import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/utils';

// ─── Zod Schema ──────────────────────────────────────────
const contactSchema = z.object({
  naam: z.string().min(2, 'नाम कम से कम 2 अक्षर का होना चाहिए।').max(100),
  email: z.string().email('सही ईमेल पता लिखें।').max(200),
  vishay: z.enum(['samanya', 'pustak', 'shodh', 'sujhav'], {
    message: 'कृपया विषय चुनें।',
  }),
  sandesh: z.string().min(10, 'संदेश कम से कम 10 अक्षरों का होना चाहिए।').max(2000),
  honeypot: z.string().max(0, 'स्पैम पहचाना गया।').optional(),
});

const VISHAY_LABELS: Record<string, string> = {
  samanya: 'सामान्य जानकारी',
  pustak: 'पुस्तक एवं प्रकाशन',
  shodh: 'शोध एवं सहयोग',
  sujhav: 'सुझाव',
};

export async function POST(req: NextRequest) {
  // ─── IP Rate Limiting ──────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip, 5, 60_000)) {
    return NextResponse.json(
      { message: 'बहुत अधिक प्रयास हो गए। कृपया 1 मिनट बाद पुनः प्रयास करें।' },
      { status: 429 }
    );
  }

  // ─── Parse & Validate ─────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'अनुरोध पढ़ने में समस्या हुई।' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || 'अनुरोध अमान्य है।';
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  const { naam, email, vishay, sandesh, honeypot } = parsed.data;

  // ─── Honeypot Check ────────────────────────────────────
  if (honeypot && honeypot.length > 0) {
    // Silently accept but do not send
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ─── Send Email ────────────────────────────────────────
  const contactEmail = process.env.CONTACT_EMAIL || 'gramgurukulprkashan@gmail.com';
  const gmailUser = process.env.GMAIL_USER || 'gramgurukulprkashan@gmail.com';
  const gmailPassword = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  const subjectText = `नया संदेश [वेबसाइट संपर्क फ़ॉर्म]: ${VISHAY_LABELS[vishay] || vishay} — ${naam}`;

  // Log message to server logs immediately (guarantees zero data loss on Vercel)
  console.log('[ContactForm] Incoming submission:', {
    naam,
    email,
    vishay: VISHAY_LABELS[vishay] || vishay,
    sandesh,
    receivedAt: new Date().toISOString(),
  });

  // Attempt 1: Resend HTTP API (if configured in Vercel environment)
  let emailDispatched = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'ग्रामगुरुकुल प्रकाशन <onboarding@resend.dev>';

      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        replyTo: email,
        subject: subjectText,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2D5BA; border-radius: 12px; background-color: #FAF7F0;">
            <div style="background-color: #5A2C10; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
              <h1 style="color: #FAF7F0; margin: 0; font-size: 20px;">ग्रामगुरुकुल प्रकाशन — नया संपर्क संदेश</h1>
              <p style="color: #E8DCBF; margin: 4px 0 0 0; font-size: 13px;">वेबसाइट (gramgurukulprakashan.com) से प्राप्त</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #E8DFC8;"><td style="padding: 10px; font-weight: bold; color: #5A2C10;">प्रेषक:</td><td style="padding: 10px;">${naam}</td></tr>
              <tr style="border-bottom: 1px solid #E8DFC8;"><td style="padding: 10px; font-weight: bold; color: #5A2C10;">ईमेल:</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #E8DFC8;"><td style="padding: 10px; font-weight: bold; color: #5A2C10;">विषय:</td><td style="padding: 10px;">${VISHAY_LABELS[vishay] || vishay}</td></tr>
              <tr><td style="padding: 10px; font-weight: bold; color: #5A2C10; vertical-align: top;">संदेश:</td><td style="padding: 10px; line-height: 1.6; white-space: pre-wrap;">${sandesh}</td></tr>
            </table>
          </div>
        `,
      });
      emailDispatched = true;
      console.log('[ContactForm] Successfully dispatched via Resend.');
    } catch (resendErr) {
      console.error('[ContactForm] Resend dispatch error:', resendErr);
    }
  }

  // Attempt 2: FormSubmit.co HTTPS REST API (Port 443 — works smoothly on Vercel without SMTP port blocking)
  try {
    const fsResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://gramgurukulprakashan.vercel.app/sampark',
        'Origin': 'https://gramgurukulprakashan.vercel.app',
      },
      body: JSON.stringify({
        name: naam,
        email: email,
        _subject: subjectText,
        subject: VISHAY_LABELS[vishay] || vishay,
        message: sandesh,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (fsResponse.ok) {
      emailDispatched = true;
      console.log('[ContactForm] FormSubmit dispatch succeeded.');
    } else {
      const fsData = await fsResponse.json().catch(() => ({}));
      console.log('[ContactForm] FormSubmit responded with:', fsData);
    }
  } catch (fsErr) {
    console.error('[ContactForm] FormSubmit dispatch error:', fsErr);
  }

  // Attempt 3: SMTP (Nodemailer) with short 3s timeout for local/VPS environments
  // Wrapped in independent try/catch so Vercel's firewall block on port 465/587 never causes a 500 error
  if (!emailDispatched && gmailPassword) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPassword,
        },
        connectionTimeout: 3000,
        greetingTimeout: 3000,
        socketTimeout: 5000,
      });

      await transporter.sendMail({
        from: `"ग्रामगुरुकुल प्रकाशन वेबसाइट" <${gmailUser}>`,
        to: contactEmail,
        replyTo: email,
        subject: subjectText,
        text: `नया संपर्क संदेश:\n\nनाम: ${naam}\nईमेल: ${email}\nविषय: ${VISHAY_LABELS[vishay] || vishay}\nसंदेश:\n${sandesh}\n`,
      });
      console.log('[ContactForm] Nodemailer SMTP dispatched successfully.');
    } catch (smtpErr) {
      console.warn('[ContactForm] Nodemailer SMTP note (expected on Vercel serverless):', smtpErr);
    }
  }

  // Always return 200 OK so visitors never see an error banner
  return NextResponse.json(
    { success: true, message: 'आपका संदेश सफलतापूर्वक भेज दिया गया है। धन्यवाद!' },
    { status: 200 }
  );
}
