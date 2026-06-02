import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-marco-dark border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Бренд */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-light tracking-widest text-white">MARCO</span>
              <span className="text-[10px] tracking-widest uppercase text-marco-muted">создаем комфортную среду</span>
            </div>
            <p className="text-sm text-marco-muted leading-relaxed">
              Комплексные решения для вашего пространства: от ремонта и мебели до управления недвижимостью.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-marco-gold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-marco-muted">
              <li>Натяжные потолки</li>
              <li>Косметический ремонт</li>
              <li>Мебель на заказ</li>
              <li>Доверительное управление</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-marco-gold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-marco-muted">
              <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Портфолио</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Блог</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Документы</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-marco-gold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-marco-muted">
              <li><a href="tel:+79991234567" className="hover:text-white transition-colors">+7 (999) 123-45-67</a></li>
              <li><a href="mailto:info@marco.studio" className="hover:text-white transition-colors">info@marco.studio</a></li>
              <li className="pt-2 flex gap-4">
                <a href="#" className="text-marco-muted hover:text-marco-gold transition-colors">Telegram</a>
                <a href="#" className="text-marco-muted hover:text-marco-gold transition-colors">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

    
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-marco-muted">
          <p>© {new Date().getFullYear()} MARCO. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}