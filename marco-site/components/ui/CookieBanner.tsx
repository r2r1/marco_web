'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'marco_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-marco-surface border border-marco-border rounded-2xl px-5 py-4 sm:px-7 sm:py-5 shadow-2xl shadow-black/40 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-marco-muted leading-relaxed">
          Мы используем файлы cookie для аналитики и улучшения работы сайта.
          Продолжая пользоваться сайтом, вы соглашаетесь с нашей{' '}
          <Link
            href="/privacy"
            className="text-marco-accent hover:text-marco-accent-hover underline underline-offset-2 transition-colors"
          >
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={decline}
            className="text-[11px] uppercase tracking-[0.15em] font-medium text-marco-faint hover:text-marco-muted transition-colors"
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-xl bg-marco-accent px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-marco-bg hover:bg-marco-accent-hover transition-all active:scale-[0.98]"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
