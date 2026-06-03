import Hero from '@/components/sections/Hero';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import PortfolioSlider from '@/components/sections/PortfolioSlider';
import CalculatorSection from '@/components/sections/CalculatorSection';
import LeadRequestTrigger from '@/components/ui/LeadRequestTrigger';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function Home() {
  return (
    <>
      <Analytics/>
      <SpeedInsights/>
      <Hero />
      <ProcessSection />
      <ServicesGrid />
      <CalculatorSection />

      <section className="py-20 px-4 sm:px-6 text-center border-t border-marco-border">
        <div className="text-marco-faint text-sm">
          <p>Готовы увеличить доходность вашей недвижимости?</p>
          <LeadRequestTrigger
            title="Бесплатная консультация"
            description="Расскажите о вашем объекте — подготовим рекомендации по росту доходности."
            defaultService="consultation"
            className="mt-2 text-marco-accent hover:underline"
          >
            Свяжитесь с нами для бесплатной консультации
          </LeadRequestTrigger>
        </div>
      </section>
    </>
  );
}
