'use client';

import Link from 'next/link';
import { useLeadRequest } from '@/components/providers/LeadRequestProvider';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from '@/lib/site-contact';
import {
  FOOTER_SERVICE_LINKS,
  MAIN_NAV_LINKS,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
} from '@/lib/site-nav';

export default function Footer() {
  const { openLeadRequest } = useLeadRequest();

  return (
    <footer className="border-t border-marco-border bg-marco-bg/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col group">
              <span className="text-2xl font-light tracking-[0.2em] text-marco-text group-hover:text-marco-accent transition-colors">
                MARCO
              </span>
              <span className="mt-1 text-[10px] tracking-[0.22em] uppercase text-marco-faint">
                {SITE_TAGLINE}
              </span>
            </Link>
            <p className="mt-5 text-sm text-marco-muted leading-relaxed max-w-sm">
              {SITE_DESCRIPTION}
            </p>
            <button
              type="button"
              onClick={() =>
                openLeadRequest({
                  title: 'Бесплатная консультация',
                  description:
                    'Расскажите о вашем объекте — подготовим рекомендации по росту доходности.',
                  defaultService: 'consultation',
                  submitLabel: 'Получить консультацию',
                })
              }
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-marco-accent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-marco-bg hover:bg-marco-accent-hover transition-all active:scale-[0.98]"
            >
              Оставить заявку
            </button>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-marco-accent mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm text-marco-muted">
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-marco-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/portfolio" className="hover:text-marco-accent transition-colors">
                  Все проекты
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-marco-accent mb-4">
              Услуги
            </h4>
            <ul className="space-y-2.5 text-sm text-marco-muted">
              {FOOTER_SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-marco-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-marco-accent mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-marco-muted">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="text-marco-text hover:text-marco-accent transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-marco-accent transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs text-marco-faint leading-relaxed">
              Готовы увеличить доходность вашей недвижимости? Оставьте заявку — перезвоним в течение
              15 минут.
            </p>
          </div>
        </div>

        <div className="border-t border-marco-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-marco-faint">
          <p>© {new Date().getFullYear()} MARCO. Все права защищены.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-marco-accent transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-marco-accent transition-colors">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
