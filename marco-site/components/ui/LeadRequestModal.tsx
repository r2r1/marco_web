'use client';

import { useEffect } from 'react';
import LeadRequestForm from '@/components/forms/LeadRequestForm';
import type { LeadServiceValue } from '@/lib/lead-services';

export interface LeadRequestModalProps {
  open: boolean;
  title?: string;
  description?: string;
  defaultService?: LeadServiceValue;
  submitLabel?: string;
  onClose: () => void;
}

export default function LeadRequestModal({
  open,
  title = 'Оставить заявку',
  description = 'Оставьте контакты — мы перезвоним и обсудим ваш объект.',
  defaultService = 'management',
  submitLabel = 'Отправить заявку',
  onClose,
}: LeadRequestModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border border-marco-border bg-marco-surface p-6 sm:p-8 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-light text-marco-text">{title}</h3>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-marco-muted">{description}</p>
            )}
          </div>
          <button
            type="button"
            aria-label="Закрыть окно"
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-colors"
          >
            ×
          </button>
        </div>

        <LeadRequestForm
          key={`${open}-${defaultService}`}
          defaultService={defaultService}
          submitLabel={submitLabel}
          onSuccess={() => {
            setTimeout(onClose, 2500);
          }}
        />
      </div>
    </div>
  );
}
