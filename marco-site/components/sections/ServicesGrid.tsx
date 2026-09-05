'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import ServiceModal from '@/components/ui/ServiceModal';

const services = [
  { 
    id: 'layout', 
    title: 'Планировочные решения', 
    desc: 'Разрабатываем эргономику, повышающую класс жилья. Превращаем неликвид в востребованный формат.', 
    details: [
      'Аудит текущей планировки и сценариев проживания',
      'Оптимизация площади под арендатора и долгий срок службы',
      'Согласование решений под бюджет и целевую ставку аренды',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ), 
    href: '/services/layout' 
  },
  { 
    id: 'renovation', 
    title: 'Комплексный ремонт', 
    desc: 'Реализация дизайн-проектов любой сложности. Строгое соблюдение сроков и стандартов качества MARCO.', 
    details: [
      'Пошаговый план ремонта с прозрачной сметой',
      'Подбор материалов по балансу цены и износостойкости',
      'Технический контроль качества на каждом этапе',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.5-4.5a2.12 2.12 0 113-3l4.5 4.5m0 0l4.5 4.5a2.12 2.12 0 01-3 3l-4.5-4.5z" />
      </svg>
    ), 
    href: '/services/renovation' 
  },
  { 
    id: 'furniture', 
    title: 'Комплектация и декор', 
    desc: 'Создаем визуальный код объекта для премиальных фото. Подбор износостойких материалов.', 
    details: [
      'Сценарная меблировка под целевую аудиторию арендаторов',
      'Комплектация техники, света и текстиля "под ключ"',
      'Подготовка объекта к съёмке и публикации объявлений',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ), 
    href: '/services/furniture' 
  },
  { 
    id: 'management', 
    title: 'Доверительное управление', 
    desc: 'Передайте нам заботы об арендаторах и техническом состоянии. Получайте чистый доход ежемесячно.', 
    details: [
      'Маркетинг объекта и отбор надёжных арендаторов',
      'Контроль оплаты, отчетность и решение операционных задач',
      'Поддержание состояния квартиры и предотвращение простоев',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ), 
    href: '/management' 
  },
];

export default function ServicesGrid() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? null,
    [activeServiceId]
  );

  return (
    <>
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-marco-bg/40 border-t border-marco-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
            <span className="inline-block text-xs uppercase tracking-widest text-marco-accent mb-4 font-medium">Экспертиза бренда</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-marco-text text-balance">Инструменты роста капитала</h2>
            <p className="text-marco-muted mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              Мы предлагаем не просто услуги, а систему действий, направленных на максимизацию прибыли от вашей недвижимости.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveServiceId(service.id)}
                className="group relative p-5 sm:p-7 bg-marco-surface border border-marco-border rounded-2xl hover:border-marco-accent/40 hover:bg-marco-surface-hover transition-all duration-500 cursor-pointer animate-fade-in-up flex flex-col justify-between h-full text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-marco-accent-subtle text-marco-accent flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-light mb-2.5 text-marco-text group-hover:text-marco-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-marco-muted leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center text-[11px] uppercase tracking-[0.15em] text-marco-faint group-hover:text-marco-accent transition-colors">
                  Подробнее
                  <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeService && (
        <ServiceModal
          open={Boolean(activeService)}
          title={activeService.title}
          description={activeService.desc}
          details={activeService.details}
          href={activeService.href}
          onClose={() => setActiveServiceId(null)}
        />
      )}
    </>
  );
}
