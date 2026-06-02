// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppProviders from '@/components/providers/AppProviders';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'MARCO | Создаем комфортную среду',
  description: 'Натяжные потолки, ремонт, мебель и доверительное управление недвижимостью.',
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
        <AppProviders>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
