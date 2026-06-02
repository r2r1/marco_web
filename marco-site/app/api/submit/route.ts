import { NextResponse } from 'next/server';
import { getMailErrorMessage, isMailConfigured, sendLeadEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, comment } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
    }

    if (!isMailConfigured()) {
      const missing = ['SMTP_USER', 'SMTP_PASS', 'MAIL_TO'].filter(
        (key) => !process.env[key]?.trim()
      );
      console.error('Mail is not configured. Missing in .env.local:', missing.join(', '));
      return NextResponse.json(
        {
          error: 'Отправка писем не настроена на сервере',
          hint:
            process.env.NODE_ENV === 'development'
              ? `Создайте файл marco-site/.env.local (не .env.example) и укажите: ${missing.join(', ')}. Затем перезапустите npm run dev.`
              : undefined,
        },
        { status: 503 }
      );
    }

    await sendLeadEmail({
      name: String(name).trim(),
      phone: String(phone).trim(),
      service: service ? String(service) : undefined,
      comment: comment ? String(comment).trim() : undefined,
    });

    return NextResponse.json({ success: true, message: 'Заявка отправлена!' });
  } catch (error) {
    console.error('Error sending lead email:', error);
    return NextResponse.json({ error: getMailErrorMessage(error) }, { status: 500 });
  }
}
