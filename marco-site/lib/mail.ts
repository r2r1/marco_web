import nodemailer from 'nodemailer';

const SERVICE_LABELS: Record<string, string> = {
  management: 'Есть квартира для сдачи',
  renovation: 'Нужен ремонт под аренду',
  profit: 'Хочу увеличить доходность',
  consultation: 'Нужна консультация',
};

export type LeadPayload = {
  name: string;
  phone: string;
  service?: string;
  comment?: string;
};

function getMailConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = (process.env.MAIL_TO ?? user)?.trim();

  if (!user || !pass || !to) {
    return null;
  }

  return { user, pass, to };
}

export function isMailConfigured(): boolean {
  return getMailConfig() !== null;
}

export async function sendLeadEmail(lead: LeadPayload): Promise<void> {
  const config = getMailConfig();
  if (!config) {
    throw new Error('SMTP не настроен: задайте SMTP_USER, SMTP_PASS и MAIL_TO в .env.local');
  }

  const serviceLabel =
    SERVICE_LABELS[lead.service ?? ''] ?? lead.service ?? 'Не выбрано';

  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE === 'true' || (process.env.SMTP_SECURE !== 'false' && port === 465);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.yandex.ru',
    port,
    secure,
    requireTLS: port === 587,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      minVersion: 'TLSv1.2',
    },
  });

  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const commentText = lead.comment?.trim() || '—';

  await transporter.sendMail({
    from: `"MARCO сайт" <${config.user}>`,
    to: config.to,
    replyTo: config.user,
    subject: `Новая заявка с сайта — ${lead.name}`,
    text: [
      'Новая заявка с главной страницы',
      '',
      `Имя: ${lead.name}`,
      `Телефон: ${lead.phone}`,
      `Услуга: ${serviceLabel}`,
      `Комментарий: ${commentText}`,
      `Дата: ${submittedAt}`,
    ].join('\n'),
    html: `
      <h2>Новая заявка с сайта MARCO</h2>
      <p><strong>Имя:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Телефон:</strong> ${escapeHtml(lead.phone)}</p>
      <p><strong>Услуга:</strong> ${escapeHtml(serviceLabel)}</p>
      <p><strong>Комментарий:</strong> ${escapeHtml(commentText)}</p>
      <p><strong>Дата:</strong> ${escapeHtml(submittedAt)}</p>
    `,
  });
}

export function getMailErrorMessage(error: unknown): string {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: string }).code)
      : '';

  if (code === 'EAUTH') {
    return 'Яндекс отклонил вход. В SMTP_PASS нужен пароль приложения (не пароль от почты). Создайте его: id.yandex.ru → Безопасность → Пароли приложений.';
  }

  return 'Не удалось отправить заявку. Проверьте SMTP в .env.local и перезапустите сервер.';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
