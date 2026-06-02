export type LeadFormData = {
  name: string;
  phone: string;
  service: string;
  comment?: string;
};

export async function submitLead(
  data: LeadFormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return { ok: true };
    }

    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error ?? 'Не удалось отправить заявку.' };
  } catch {
    return {
      ok: false,
      error: 'Не удалось отправить заявку. Проверьте интернет и попробуйте снова.',
    };
  }
}
