'use client';

import HeroBackground from './HeroBackground';
import LeadRequestForm from '@/components/forms/LeadRequestForm';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-marco-accent-border bg-marco-accent-subtle/80 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-marco-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-marco-accent">
                Бесплатный аудит объекта
              </span>
            </div>

            <h1 className="text-[38px] sm:text-[46px] lg:text-[58px] xl:text-[66px] leading-[1.04] font-extralight text-marco-text text-balance">
              Сдавайте квартиру{' '}
              <span className="italic font-normal text-marco-accent">дороже</span>
              <br />
              без вложений
            </h1>

            <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-base md:text-lg leading-relaxed text-marco-muted">
              Финансируем подготовку объекта под аренду: ремонт, меблировку и комплектацию за свой счёт
            </p>

            <div className="mt-15 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-8">
                <div>
                  <div className="text-2xl font-light text-marco-text">+35%</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-marco-faint">
                    Рост арендной ставки
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-light text-marco-text">0 ₽</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-marco-faint">вложений</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-marco-text">Под ключ</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-marco-faint">
                    от подготовки до управления
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 mt-16">
            <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-7">
              <h2 className="text-xl font-light text-marco-text">Узнайте потенциал вашей квартиры</h2>
              <p className="mt-2 text-sm text-marco-muted">
                Рассчитаем рыночную стоимость аренды и покажем точки роста доходности.
              </p>

              <div className="mt-7">
                <LeadRequestForm submitLabel="Получить расчёт" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
