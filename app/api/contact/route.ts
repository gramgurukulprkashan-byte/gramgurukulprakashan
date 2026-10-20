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

  try {
    if (process.env.RESEND_API_KEY) {
      // Use Resend
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ग्रामगुरुकुल प्रकाशन <noreply@gramgurukulprakashan.org>',
        to: contactEmail,
        replyTo: email,
        subject: `नया संदेश: ${VISHAY_LABELS[vishay] || vishay} — ${naam}`,
        html: `
          <h2>नया संपर्क संदेश</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">नाम</td><td style="padding:8px">${naam}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">ईमेल</td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">विषय</td><td style="padding:8px">${VISHAY_LABELS[vishay] || vishay}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">संदेश</td><td style="padding:8px">${sandesh.replace(/\n/g, '<br>')}</td></tr>
          </table>
          <hr>
          <p style="color:#888;font-size:12px">यह संदेश gramgurukulprakashan.org के संपर्क फ़ॉर्म से भेजा गया है।</p>
        `,
      });
    } else {
      // Log to console in dev (do not store personal data in DB unless explicitly configured)
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
