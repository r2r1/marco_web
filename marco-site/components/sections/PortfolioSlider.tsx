'use client';

import { useState } from 'react';
import Link from 'next/link';
import LeadRequestTrigger from '@/components/ui/LeadRequestTrigger';

type Category = 'all' | 'renovation' | 'furniture' | 'management';

interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'all'>;
  location: string;
  image: string;
  beforeRent: string;
  afterRent: string;
  leaseTime: string;
  roi: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Евро-двушка в ЖК «Сердце Столицы»',
    category: 'renovation',
    location: 'Москва, Сити',
    image: '/images/portfolio/project-1.jpg',
    beforeRent: '45 000 ₽',
    afterRent: '75 000 ₽',
    leaseTime: '9 дней',
    roi: '+67%',
  },
  {
    id: '2',
    title: 'Студия с эргономичной мебелью',
    category: 'furniture',
    location: 'Санкт-Петербург, Центр',
    image: '/images/portfolio/project-2.jpg',
    beforeRent: '28 000 ₽',
    afterRent: '42 000 ₽',
    leaseTime: '5 дней',
    roi: '+50%',
  },
  {
    id: '3',
    title: 'Трёхкомнатная под долгосрочную аренду',
    category: 'management',
    location: 'Казань, Ново-Савиновский',
    image: '/images/portfolio/project-3.jpg',
    beforeRent: '55 000 ₽',
    afterRent: '82 000 ₽',
    leaseTime: '12 дней',
    roi: '+49%',
  },
  {
    id: '4',
    title: 'Лофт с перепланировкой',
    category: 'renovation',
    location: 'Екатеринбург, Центр',
    image: '/images/portfolio/project-4.jpg',
    beforeRent: '38 000 ₽',
    afterRent: '61 000 ₽',
    leaseTime: '7 дней',
    roi: '+61%',
  },
];

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'Все проекты' },
  { id: 'renovation', label: 'Ремонт' },
  { id: 'furniture', label: 'Меблировка' },
  { id: 'management', label: 'Управление' },
];

export default function PortfolioSlider() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-marco-border">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <span className="inline-block text-xs uppercase tracking-widest text-marco-accent mb-4 font-medium">
            Наши работы
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-marco-text text-balance">
            Реальные кейсы роста доходности
          </h2>
          <p className="text-marco-muted mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Каждый проект — это измеримый результат. Мы показываем, как изменилась
            арендная ставка и скорость заселения после нашей работы.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 animate-fade-in-up animate-delay-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-marco-accent text-marco-bg shadow-lg shadow-marco-accent/20'
                  : 'bg-marco-surface text-marco-faint hover:text-marco-accent hover:bg-marco-surface-hover border border-marco-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group relative bg-marco-surface border border-marco-border rounded-2xl overflow-hidden hover:border-marco-accent/40 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-marco-bg/80 backdrop-blur-sm border border-marco-border">
                  <span className="text-[10px] uppercase tracking-widest text-marco-accent">
                    {categories.find((c) => c.id === project.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-light text-marco-text group-hover:text-marco-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-marco-faint mt-1">{project.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="block text-xl font-light text-marco-accent">{project.roi}</span>
                    <span className="text-[10px] uppercase tracking-widest text-marco-faint">Рост ставки</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 border-t border-marco-border">
                  <div>
                    <span className="block text-xs text-marco-faint">До</span>
                    <span className="text-sm text-marco-muted line-through">{project.beforeRent}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-marco-faint">После</span>
                    <span className="text-sm font-medium text-marco-text">{project.afterRent}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-marco-faint">Заселение</span>
                    <span className="text-sm text-marco-accent">{project.leaseTime}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/portfolio/${project.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-marco-faint group-hover:text-marco-accent transition-colors"
                >
                  Смотреть кейс
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <p className="text-marco-muted">
              В этой категории пока нет проектов.{' '}
              <LeadRequestTrigger
                title="Обсудить ваш проект"
                description="Расскажите о задаче — предложим решение под ваш объект."
                className="text-marco-accent hover:underline"
              >
                Свяжитесь с нами
              </LeadRequestTrigger>{' '}
              для обсуждения вашей задачи.
            </p>
          </div>
        )}

        {/* VIEW ALL */}
        <div className="text-center mt-12 animate-fade-in-up animate-delay-200">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-all duration-300"
          >
            Смотреть все проекты
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
