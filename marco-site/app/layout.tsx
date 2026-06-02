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
