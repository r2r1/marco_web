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

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://t.me/marco_kmv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/marco__kmv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>

              <a
                href="https://vk.com/marco_kmv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/>
                </svg>
              </a>
            </div>

            <p className="mt-4 text-xs text-marco-faint leading-relaxed">
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
