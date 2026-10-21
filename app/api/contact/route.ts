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
  const contactEmail = process.env.CONTACT_EMAIL || 'gramgurukulprakashan@gmail.com';
  const gmailUser = process.env.GMAIL_USER || 'gramgurukulprakashan@gmail.com';
  const gmailPassword = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

  try {
    if (process.env.RESEND_API_KEY) {

      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'ग्रामगुरुकुल प्रकाशन <onboarding@resend.dev>';

      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        replyTo: email,
        subject: `नया संदेश [वेबसाइट संपर्क फ़ॉर्म]: ${VISHAY_LABELS[vishay] || vishay} — ${naam}`,
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
    } else if (gmailPassword) {
      // 2. Nodemailer with Gmail SMTP
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPassword,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      const mailSubject = `नया संदेश [वेबसाइट संपर्क फ़ॉर्म]: ${VISHAY_LABELS[vishay] || vishay} — ${naam}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2D5BA; border-radius: 12px; background-color: #FAF7F0;">
          <div style="background-color: #5A2C10; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #FAF7F0; margin: 0; font-size: 20px;">ग्रामगुरुकुल प्रकाशन — नया संपर्क संदेश</h1>
            <p style="color: #E8DCBF; margin: 4px 0 0 0; font-size: 13px;">वेबसाइट (gramgurukulprakashan.com) के संपर्क फ़ॉर्म से प्राप्त</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #E8DFC8;">
              <td style="padding: 10px; font-weight: bold; color: #5A2C10; width: 120px;">प्रेषक का नाम:</td>
              <td style="padding: 10px; color: #1A1A1A;">${naam}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8DFC8;">
              <td style="padding: 10px; font-weight: bold; color: #5A2C10;">ईमेल:</td>
              <td style="padding: 10px; color: #1A1A1A;"><a href="mailto:${email}" style="color: #C8661E; text-decoration: underline;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #E8DFC8;">
              <td style="padding: 10px; font-weight: bold; color: #5A2C10;">विषय:</td>
              <td style="padding: 10px; color: #1A1A1A;">${VISHAY_LABELS[vishay] || vishay}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #5A2C10; vertical-align: top;">संदेश:</td>
              <td style="padding: 10px; color: #1A1A1A; line-height: 1.6; white-space: pre-wrap;">${sandesh}</td>
            </tr>
          </table>

          <div style="background-color: #EFE8D6; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #7A4A2B; text-align: center;">
            सीधे इस ईमेल का उत्तर (Reply) देकर आप <strong>${email}</strong> को जवाब भेज सकते हैं।
          </div>

          <p style="text-align: center; color: #8B5A2B; font-size: 11px; margin-top: 20px;">
            © ${new Date().getFullYear()} ग्रामगुरुकुल प्रकाशन, झाबुआ (मध्य प्रदेश)
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"ग्रामगुरुकुल प्रकाशन वेबसाइट" <${gmailUser}>`,
        to: contactEmail,
        replyTo: email,
        subject: mailSubject,
        html: htmlContent,
        text: `नया संपर्क संदेश:\n\nनाम: ${naam}\nईमेल: ${email}\nविषय: ${VISHAY_LABELS[vishay] || vishay}\nसंदेश:\n${sandesh}\n`,
      });
    } else {
      console.log('[ContactForm] New message from:', naam, '|', email, '|', vishay);
    }
  } catch (err) {
    console.error('[ContactForm] Email send failed:', err);
    return NextResponse.json(
      { message: 'संदेश भेजने में समस्या हुई। कृपया सीधे ईमेल करें: gramgurukulprakashan@gmail.com' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: 'आपका संदेश सफलतापूर्वक भेज दिया गया है। धन्यवाद!' },
    { status: 200 }
  );
}
