import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/site-contact';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | MARCO',
  description: 'Политика конфиденциальности и обработки персональных данных компании MARCO.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-marco-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-marco-faint hover:text-marco-accent transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            На главную
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-marco-accent mb-3">
            Юридические документы
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-marco-text">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 text-sm text-marco-muted">
            Последнее обновление: 9 июня 2026 г.
          </p>
        </div>

        {/* Content */}
        <div className="prose-marco space-y-10 text-sm text-marco-muted leading-relaxed">

          <Section title="1. Общие положения">
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
              и защиты персональных данных пользователей сайта <strong className="text-marco-text">marco-kmv.ru</strong> (далее — «Сайт»),
              принадлежащего компании MARCO (далее — «Компания», «мы»).
            </p>
            <p>
              Используя Сайт, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны,
              пожалуйста, прекратите использование Сайта.
            </p>
          </Section>

          <Section title="2. Какие данные мы собираем">
            <p>Мы можем собирать следующие категории данных:</p>
            <ul>
              <li>
                <strong className="text-marco-text">Контактные данные</strong> — имя и номер телефона,
                которые вы указываете при заполнении формы заявки.
              </li>
              <li>
                <strong className="text-marco-text">Технические данные</strong> — IP-адрес, тип браузера,
                операционная система, страницы посещений, время и дата визита, реферер.
              </li>
              <li>
                <strong className="text-marco-text">Данные об использовании</strong> — действия на сайте,
                клики, скролл и поведенческие паттерны (собираются через Яндекс.Метрику).
              </li>
            </ul>
          </Section>

          <Section title="3. Файлы cookie">
            <p>
              Сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые браузером на
              вашем устройстве. Cookie помогают нам анализировать трафик и улучшать сайт.
            </p>
            <p>Мы используем следующие типы cookie:</p>
            <ul>
              <li>
                <strong className="text-marco-text">Технические (необходимые)</strong> — обеспечивают
                базовую работу сайта. Не требуют согласия.
              </li>
              <li>
                <strong className="text-marco-text">Аналитические</strong> — собираются сервисом
                Яндекс.Метрика для анализа посещаемости: просмотры страниц, источники трафика,
                карта кликов, вебвизор. Данные передаются Яндексу в обезличенном виде.
              </li>
            </ul>
            <p>
              Вы можете в любой момент запретить сохранение cookie в настройках вашего браузера. Это
              может повлиять на корректность работы некоторых функций сайта.
            </p>
          </Section>

          <Section title="4. Цели обработки данных">
            <p>Собранные данные используются для:</p>
            <ul>
              <li>Обработки заявок и связи с вами по вашему запросу.</li>
              <li>Анализа посещаемости и улучшения качества Сайта.</li>
              <li>Обеспечения безопасности и предотвращения мошенничества.</li>
              <li>Выполнения требований законодательства Российской Федерации.</li>
            </ul>
          </Section>

          <Section title="5. Передача данных третьим лицам">
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих
              целях. Данные могут быть переданы:
            </p>
            <ul>
              <li>
                <strong className="text-marco-text">Яндекс (Яндекс.Метрика)</strong> — в рамках
                аналитики, в обезличенном виде, согласно{' '}
                <a
                  href="https://yandex.ru/legal/confidential/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marco-accent hover:text-marco-accent-hover transition-colors underline underline-offset-2"
                >
                  политике конфиденциальности Яндекса
                </a>
                .
              </li>
              <li>
                Государственным органам — по требованию действующего законодательства РФ.
              </li>
            </ul>
          </Section>

          <Section title="6. Хранение данных">
            <p>
              Контактные данные из заявок хранятся в течение срока, необходимого для выполнения
              запроса, но не более 3 лет с момента получения, после чего удаляются.
              Технические и аналитические данные хранятся в соответствии с политикой
              соответствующих сервисов.
            </p>
          </Section>

          <Section title="7. Ваши права">
            <p>В соответствии с Федеральным законом № 152-ФЗ «О персональных данных» вы вправе:</p>
            <ul>
              <li>Получить информацию об обработке ваших персональных данных.</li>
              <li>Потребовать уточнения, блокировки или удаления ваших данных.</li>
              <li>Отозвать согласие на обработку данных в любой момент.</li>
              <li>Обратиться с жалобой в Роскомнадзор.</li>
            </ul>
            <p>
              Для реализации прав направьте запрос на{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-marco-accent hover:text-marco-accent-hover transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="8. Защита данных">
            <p>
              Мы принимаем организационные и технические меры для защиты ваших данных от
              несанкционированного доступа, изменения, раскрытия или уничтожения. Передача данных
              на Сайте осуществляется по защищённому протоколу HTTPS.
            </p>
          </Section>

          <Section title="9. Изменения Политики">
            <p>
              Мы вправе обновлять настоящую Политику. Актуальная версия всегда доступна на этой
              странице. При существенных изменениях мы разместим уведомление на Сайте. Дата
              последнего обновления указана в начале документа.
            </p>
          </Section>

          <Section title="10. Контакты">
            <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
            <ul>
              <li>
                <strong className="text-marco-text">Телефон:</strong>{' '}
                <a
                  href={`tel:+79331797333`}
                  className="text-marco-accent hover:text-marco-accent-hover transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <strong className="text-marco-text">Email:</strong>{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-marco-accent hover:text-marco-accent-hover transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-medium text-marco-text mb-4 tracking-wide">{title}</h2>
      <div className="space-y-3 [&_ul]:mt-2 [&_ul]:ml-4 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:list-outside">
        {children}
      </div>
    </section>
  );
}
