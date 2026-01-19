import type { Metadata, Viewport } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navigation } from '@/components/layout/Navigation';
import { PageTransition } from '@/components/layout/PageTransition';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Faiz Intifada Julian Romli - Digital Specialist',
  description:
    'Results-driven Digital Specialist with strong expertise in AI community management, visual communication, and digital product development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={libreBaskerville.variable} style={{ colorScheme: 'light' }}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <div className="root">
          <main id="main-content" className="min-h-screen p-6 lg:flex lg:gap-6 lg:p-8 xl:p-12 max-w-7xl mx-auto">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <Navigation />
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
