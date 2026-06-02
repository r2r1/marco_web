'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLeadRequest } from '@/components/providers/LeadRequestProvider';
import { MAIN_NAV_LINKS, SITE_TAGLINE } from '@/lib/site-nav';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openLeadRequest } = useLeadRequest();

  const openRequestModal = () => {
    setIsOpen(false);
    openLeadRequest({
      title: 'Бесплатная консультация',
      description: 'Расскажите о вашем объекте — подготовим рекомендации по росту доходности.',
      defaultService: 'consultation',
      submitLabel: 'Получить консультацию',
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50  backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex flex-col group" onClick={() => setIsOpen(false)}>
          <span className="text-xl sm:text-2xl font-light tracking-widest text-white group-hover:text-marco-gold transition-colors">
            MARCO
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-marco-muted">
            {SITE_TAGLINE}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-light tracking-wide">
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-marco-muted hover:text-marco-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={openRequestModal}
            className="border border-marco-gold/50 px-6 py-2 text-xs uppercase tracking-widest text-marco-gold hover:bg-marco-gold hover:text-marco-dark transition-all duration-300 rounded-sm"
          >
            Оставить заявку
          </button>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-marco-dark/95 backdrop-blur-lg border-b border-white/10 py-6 px-5 sm:px-8 space-y-4 animate-fade-in">
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-light text-marco-text hover:text-marco-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openRequestModal}
            className="block w-full text-center border border-marco-gold/50 px-6 py-3 text-xs uppercase tracking-widest text-marco-gold hover:bg-marco-gold hover:text-marco-dark transition-all rounded-sm mt-4"
          >
            Оставить заявку
          </button>
        </div>
      )}
    </header>
  );
}
