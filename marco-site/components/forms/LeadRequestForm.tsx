'use client';

import { useState } from 'react';
import { LEAD_SERVICE_OPTIONS, type LeadServiceValue } from '@/lib/lead-services';
import { submitLead } from '@/lib/submit-lead';
import {
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  LEAD_FORM_ERROR_PREFIX,
  LEAD_FORM_SUCCESS_MESSAGE,
} from '@/lib/site-contact';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface LeadRequestFormProps {
  defaultService?: LeadServiceValue;
  submitLabel?: string;
  onSuccess?: () => void;
}

export default function LeadRequestForm({
  defaultService = 'management',
  submitLabel = 'Отправить заявку',
  onSuccess,
}: LeadRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: defaultService,
    comment: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await submitLead(formData);

    if (result.ok) {
      setStatus('success');
      setFormData({ name: '', phone: '', service: defaultService, comment: '' });
      onSuccess?.();
      setTimeout(() => setStatus('idle'), 6000);
      return;
    }

    setStatus('error');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        placeholder="Ваше имя"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full rounded-xl border border-marco-border bg-marco-bg/60 px-4 py-3 text-marco-text placeholder-marco-faint focus:outline-none focus:border-marco-accent transition-all"
      />

      <input
        type="tel"
        required
        placeholder="+7 (999) 000-00-00"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full rounded-xl border border-marco-border bg-marco-bg/60 px-4 py-3 text-marco-text placeholder-marco-faint focus:outline-none focus:border-marco-accent transition-all"
      />

      <select
        value={formData.service}
        onChange={(e) =>
          setFormData({ ...formData, service: e.target.value as LeadServiceValue })
        }
        className="w-full rounded-xl border border-marco-border bg-marco-bg/60 px-4 py-3 text-marco-text focus:outline-none focus:border-marco-accent transition-all"
      >
        {LEAD_SERVICE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <textarea
        rows={4}
        placeholder="Комментарий (необязательно)"
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        className="w-full resize-none rounded-xl border border-marco-border bg-marco-bg/60 px-4 py-3 text-marco-text placeholder-marco-faint focus:outline-none focus:border-marco-accent transition-all"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-marco-accent py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-marco-bg transition-all hover:bg-marco-accent-hover active:scale-[0.99] disabled:opacity-50"
      >
        {status === 'loading' ? 'Отправляем...' : submitLabel}
      </button>

      {status === 'success' && (
        <div className="rounded-xl border border-marco-success/30 bg-marco-success/10 p-3 text-center text-sm text-marco-success leading-relaxed">
          {LEAD_FORM_SUCCESS_MESSAGE}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl border border-marco-error/30 bg-marco-error/10 p-3 text-center text-sm text-marco-error leading-relaxed">
          {LEAD_FORM_ERROR_PREFIX}{' '}
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="font-medium underline underline-offset-2 hover:text-marco-text transition-colors"
          >
            {CONTACT_PHONE_DISPLAY}
          </a>
          .
        </div>
      )}

      <p className="text-center text-[10px] leading-relaxed text-marco-faint">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
      </p>
    </form>
  );
}
