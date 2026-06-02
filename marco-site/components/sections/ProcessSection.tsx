'use client';

const steps = [
  {
    num: '01',
    title: 'Аудит квартиры',
    desc: 'Оцениваем потенциал роста аренды и рассчитываем экономику проекта.',
  },
  {
    num: '02',
    title: 'Инвестируем в улучшения',
    desc: 'Финансируем подготовку объекта: косметику, меблировку и комплектацию.',
  },
  {
    num: '03',
    title: 'Повышаем доходность',
    desc: 'Увеличиваем привлекательность квартиры и выводим её на рынок по новой ставке.',
  },
  {
    num: '04',
    title: 'Получаем доход вместе',
    desc: 'Берём объект в управление или получаем согласованную долю арендного дохода.',
  },
];

export default function ProcessSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* HEADER */}

        <div className="max-w-3xl">

          <span className="text-[11px] uppercase tracking-[0.24em] text-marco-accent">
            Как это работает
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extralight text-marco-text">
            Мы зарабатываем только
            <br />
            когда растёт ваш доход
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-marco-muted">
            В отличие от подрядчиков, мы заинтересованы
            не в ремонте квартиры, а в увеличении её
            арендной доходности.
          </p>

        </div>

        {/* TIMELINE */}

        <div className="relative mt-20">

          <div className="absolute left-0 right-0 top-7 hidden lg:block h-px bg-white/10" />

          <div className="grid gap-8 lg:grid-cols-4">

            {steps.map((step) => (
              <div
                key={step.num}
                className="relative"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full border border-marco-accent/30 bg-marco-accent-subtle backdrop-blur-sm text-marco-accent text-sm tracking-widest">
                  {step.num}
                </div>

                <h3 className="mt-6 text-xl font-light text-marco-text">
                  {step.title}
                </h3>

                <p className="mt-3 text-marco-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}