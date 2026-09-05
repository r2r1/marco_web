'use client';
import { useState } from 'react';
import { useLeadRequest } from '@/components/providers/LeadRequestProvider';

export default function CalculatorSection() {
  const { openLeadRequest } = useLeadRequest();
  const [sqm, setSqm] = useState(40);
  const [dailyRate, setDailyRate] = useState(3200);
  const [occupiedDays, setOccupiedDays] = useState(18);
  const [condition, setCondition] = useState<'bad' | 'normal' | 'good'>('normal');
  const [location, setLocation] = useState<'center' | 'business' | 'sleeping'>('business');
  const [result, setResult] = useState<{
    currentRevenue: number;
    potentialDailyRate: number;
    potentialOccupiedDays: number;
    potentialRevenue: number;
    monthlyGrowth: number;
    currentAnnualRevenue: number;
    potentialAnnualRevenue: number;
  } | null>(null);

  const handleCalculate = () => {
    const locationRateBoost = location === 'center' ? 20 : location === 'business' ? 14 : 10;
    const conditionRateBoost = condition === 'bad' ? 14 : condition === 'normal' ? 9 : 6;
    const sizeRateBoost = sqm < 30 ? 6 : sqm > 60 ? -2 : 2;
    const rateGrowthPercent = Math.max(8, Math.min(40, locationRateBoost + conditionRateBoost + sizeRateBoost));
    const occupancyBoost = location === 'center' ? 0.2 : location === 'business' ? 0.15 : 0.1;

    const currentRevenue = dailyRate * occupiedDays;
    const potentialDailyRate = Math.round(dailyRate * (1 + rateGrowthPercent / 100));
    const potentialOccupiedDays = Math.min(30, Math.round(occupiedDays * (1 + occupancyBoost)));
    const potentialRevenue = potentialDailyRate * potentialOccupiedDays;
    const monthlyGrowth = potentialRevenue - currentRevenue;
    const currentAnnualRevenue = currentRevenue * 12;
    const potentialAnnualRevenue = potentialRevenue * 12;

    setResult({
      currentRevenue,
      potentialDailyRate,
      potentialOccupiedDays,
      potentialRevenue,
      monthlyGrowth,
      currentAnnualRevenue,
      potentialAnnualRevenue,
    });
  };

  const handleReset = () => {
    setSqm(40);
    setDailyRate(3200);
    setOccupiedDays(18);
    setCondition('normal');
    setLocation('business');
    setResult(null);
  };

  const getButtonClass = (isActive: boolean) => {
    return isActive
      ? 'bg-marco-accent text-marco-bg font-medium shadow-lg shadow-marco-accent/20 border-marco-accent'
      : 'bg-marco-surface text-marco-faint hover:text-marco-accent border-marco-border';
  };

  const interactiveClass = 'relative z-20 pointer-events-auto';

  return (
    <section id="calculator" className="relative z-20 py-16 sm:py-24 px-4 sm:px-6 border-t border-marco-border bg-marco-bg/30">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
          <span className="inline-block text-xs uppercase tracking-widest text-marco-accent mb-4 font-medium">
            Калькулятор инвестора
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-marco-text text-balance">
            Оцените потенциал{' '}
            <span className="text-marco-accent italic font-normal">вашей квартиры</span>
          </h2>
          <p className="text-marco-muted mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Настройте параметры объекта — мы покажем, насколько можно увеличить
            арендную ставку и за какой срок окупятся вложения.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          
          {/* ЛЕВАЯ КОЛОНКА — ВВОД */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 animate-fade-in-up">
            <h3 className="text-lg font-light text-marco-text mb-6">Параметры объекта</h3>
            
            <div className="space-y-6">
              {/* ПЛОЩАДЬ */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-marco-faint">Площадь</span>
                  <span className="text-sm font-medium text-marco-accent">{sqm} м²</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={120}
                  step={5}
                  value={sqm}
                  onChange={(e) => setSqm(Number(e.target.value))}
                  className={`w-full h-2 bg-marco-border rounded-lg cursor-pointer accent-marco-accent ${interactiveClass}`}
                />
                <div className="flex justify-between mt-1.5 text-[10px] text-marco-faint">
                  <span>20 м²</span>
                  <span>120 м²</span>
                </div>
              </div>

              {/* АРЕНДА */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-marco-faint">Ставка за сутки</span>
                  <span className="text-sm font-medium text-marco-accent">{dailyRate.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={12000}
                  step={100}
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className={`w-full h-2 bg-marco-border rounded-lg cursor-pointer accent-marco-accent ${interactiveClass}`}
                />
                <div className="flex justify-between mt-1.5 text-[10px] text-marco-faint">
                  <span>1 500 ₽</span>
                  <span>12 000 ₽</span>
                </div>
              </div>

              {/* ЗАГРУЗКА */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-marco-faint">Загрузка, дней в месяц</span>
                  <span className="text-sm font-medium text-marco-accent">{occupiedDays} дней</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={28}
                  step={1}
                  value={occupiedDays}
                  onChange={(e) => setOccupiedDays(Number(e.target.value))}
                  className={`w-full h-2 bg-marco-border rounded-lg cursor-pointer accent-marco-accent ${interactiveClass}`}
                />
                <div className="flex justify-between mt-1.5 text-[10px] text-marco-faint">
                  <span>8 дней</span>
                  <span>28 дней</span>
                </div>
              </div>

              {/* СОСТОЯНИЕ */}
              <div>
                <span className="block text-xs uppercase tracking-[0.15em] text-marco-faint mb-3">Состояние</span>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCondition('bad')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(condition === 'bad')}`}
                  >
                    Требует ремонта
                  </button>
                  <button
                    type="button"
                    onClick={() => setCondition('normal')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(condition === 'normal')}`}
                  >
                    Косметика
                  </button>
                  <button
                    type="button"
                    onClick={() => setCondition('good')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(condition === 'good')}`}
                  >
                    Эргономика
                  </button>
                </div>
              </div>

              {/* ЛОКАЦИЯ */}
              <div>
                <span className="block text-xs uppercase tracking-[0.15em] text-marco-faint mb-3">Расположение</span>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLocation('center')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(location === 'center')}`}
                  >
                    Центр города
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('business')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(location === 'business')}`}
                  >
                    Бизнес-район
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('sleeping')}
                    className={`px-3 py-2.5 rounded-lg text-[11px] uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer ${interactiveClass} ${getButtonClass(location === 'sleeping')}`}
                  >
                    Жилой район
                  </button>
                </div>
              </div>

              {/* ДЕЙСТВИЯ */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className={`flex-1 bg-marco-accent text-marco-bg font-medium py-3.5 rounded-xl uppercase tracking-[0.15em] text-[11px] hover:bg-marco-accent-hover transition-all active:scale-[0.98] cursor-pointer ${interactiveClass}`}
                >
                  Рассчитать
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={`px-5 py-3.5 rounded-xl border border-marco-border text-marco-faint hover:text-marco-accent hover:border-marco-accent/40 transition-all text-[11px] uppercase tracking-[0.1em] cursor-pointer ${interactiveClass}`}
                >
                  Сбросить
                </button>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — РЕЗУЛЬТАТ */}
          <div className="animate-fade-in-up animate-delay-200">
            {!result ? (
              <div className="glass-panel rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center h-full min-h-[280px] sm:min-h-[400px]">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-marco-accent-subtle text-marco-accent flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-light text-marco-text mb-2">Настройте параметры</h4>
                <p className="text-marco-muted text-sm max-w-xs">
                  Укажите площадь, посуточную ставку и текущую загрузку —
                  нажмите «Рассчитать» для прогноза выручки.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="glass-panel rounded-2xl p-5 sm:p-7 border border-marco-accent/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-[0.15em] text-marco-faint">Потенциальная выручка</span>
                    <span className="text-xs uppercase tracking-[0.15em] text-marco-accent">
                      +{result.currentRevenue > 0 ? Math.round((result.monthlyGrowth / result.currentRevenue) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-light text-marco-text">
                      {result.potentialRevenue.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-base sm:text-lg text-marco-muted">₽/мес</span>
                  </div>
                  <p className="text-sm text-marco-faint mt-2">
                    вместо {result.currentRevenue.toLocaleString('ru-RU')} ₽ сейчас
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="glass-panel rounded-xl p-5">
                    <span className="block text-xs uppercase tracking-[0.12em] text-marco-faint mb-1">Новая ставка</span>
                    <span className="text-xl font-light text-marco-accent">
                      {result.potentialDailyRate.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="glass-panel rounded-xl p-5">
                    <span className="block text-xs uppercase tracking-[0.12em] text-marco-faint mb-1">Загрузка</span>
                    <span className="text-xl font-light text-marco-accent">
                      {result.potentialOccupiedDays} дней
                    </span>
                  </div>
                  <div className="glass-panel rounded-xl p-5 relative">
                    <div className="absolute top-3 right-3 group">
                      <button
                        type="button"
                        aria-label="Пояснение выручки в год"
                        className="w-5 h-5 rounded-full border border-marco-accent/40 text-marco-accent text-[11px] leading-none flex items-center justify-center hover:bg-marco-accent/10 transition-colors"
                      >
                        !
                      </button>
                      <div className="pointer-events-none absolute right-0 mt-2 w-48 sm:w-64 max-w-[80vw] rounded-lg border border-marco-border bg-marco-surface/95 p-3 text-[11px] leading-relaxed text-marco-muted opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                        Выручка в год = выручка в месяц × 12. Показываем до и после улучшений.
                      </div>
                    </div>
                    <span className="block text-xs uppercase tracking-[0.12em] text-marco-faint mb-1">Выручка в год (было)</span>
                    <span className="text-xl font-light text-marco-accent">
                      {(result.currentAnnualRevenue ?? result.currentRevenue * 12).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="glass-panel rounded-xl p-5">
                    <span className="block text-xs uppercase tracking-[0.12em] text-marco-faint mb-1">Выручка в год (стало)</span>
                    <span className="text-xl font-light text-marco-accent">
                      {(result.potentialAnnualRevenue ?? result.potentialRevenue * 12).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-marco-accent/20">
                  <h4 className="text-base font-light text-marco-text mb-3">Хотите точный расчёт?</h4>
                  <p className="text-sm text-marco-muted mb-5">
                    Оставьте заявку — специалист проанализирует ваш объект
                    и подготовит детальную финансовую модель.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadRequest({
                        title: 'Заказать аудит объекта',
                        description:
                          'Специалист проанализирует объект и подготовит детальную финансовую модель.',
                        defaultService: 'consultation',
                        submitLabel: 'Заказать аудит',
                      })
                    }
                    className="inline-flex items-center justify-center w-full gap-2 bg-marco-accent text-marco-bg font-medium py-3.5 rounded-xl uppercase tracking-[0.15em] text-[11px] hover:bg-marco-accent-hover transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Заказать аудит объекта
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-marco-faint/60 mt-10 leading-snug">
          * Расчёт является ориентировочным. Точная модель формируется после аудита объекта
          с учётом локации, инфраструктуры, конкуренции и рыночной конъюнктуры.
        </p>

      </div>
    </section>
  );
}
