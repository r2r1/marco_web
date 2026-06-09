// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppProviders from '@/components/providers/AppProviders';
import CookieBanner from '@/components/ui/CookieBanner';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'MARCO | Эксперты в доходной недвижимости',
  description: 'MARCO — эксперты в доходной недвижимости. Управление посуточной и долгосрочной арендой, ремонт и комплектация под ключ. Звоните: +7 (933) 179-73-33.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
            <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Для старых браузеров можно добавить PNG-версию */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-marco-dark text-marco-text antialiased`}>
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=109696244','ym');
            ym(109696244,'init',{
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109696244" style={{position:'absolute',left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika */}
        <AppProviders>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </AppProviders>
      </body>
    </html>
  );
}
