'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ServiceModalProps {
  open: boolean;
  title: string;
  description: string;
  details: string[];
  href: string;
  onClose: () => void;
}

export default function ServiceModal({
  open,
  title,
  description,
  details,
  href,
  onClose,
}: ServiceModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Закрыть модальное окно"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-marco-border bg-marco-surface p-6 sm:p-8 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-light text-marco-text">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-marco-muted">{description}</p>
          </div>
          
        </div>

        <ul className="mt-6 space-y-2">
          {details.map((item) => (
            <li key={item} className="text-sm text-marco-muted">
              • {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-marco-border px-6 py-3 text-[11px] uppercase tracking-[0.15em] text-marco-faint transition-all hover:text-marco-accent hover:border-marco-accent/40"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
