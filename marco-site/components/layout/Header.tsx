'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLeadRequest } from '@/components/providers/LeadRequestProvider';

const navLinks = [
  { href: '/services', label: 'Услуги' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/management', label: 'Управление' },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openLeadRequest } = useLeadRequest();

  const openRequestModal = () => {
    setIsOpen(false);
    openLeadRequest({
      title: 'Оставить заявку',
      description: 'Оставьте контакты — мы перезвоним и ответим на ваши вопросы.',
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-marco-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-light tracking-widest text-white">MARCO</span>
          <span className="text-[10px] tracking-widest uppercase text-marco-muted">
            создаем комфортную среду
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-light tracking-wide">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-marco-gold transition-colors">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openRequestModal}
            className="hover:text-marco-gold transition-colors"
          >
            Контакты
          </button>
        </nav>

        <button
          type="button"
          onClick={openRequestModal}
          className="hidden md:block border border-marco-gold/50 px-6 py-2 text-xs uppercase tracking-widest text-marco-gold hover:bg-marco-gold hover:text-marco-dark transition-all duration-300 rounded-sm"
        >
          Оставить заявку
        </button>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Открыть меню"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-marco-dark/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-light text-marco-text hover:text-marco-gold"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openRequestModal}
            className="block w-full text-left text-lg font-light text-marco-text hover:text-marco-gold"
          >
            Контакты
          </button>
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
