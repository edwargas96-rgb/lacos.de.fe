import type { Metadata, Viewport } from 'next';
import { Fraunces, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import AttributionCapture from '@/components/AttributionCapture';
import ActivityToasts from '@/components/ActivityToasts';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', display: 'swap', adjustFontFallback: false });

const title = `${site.brand} — 30 encontros de 15 minutos para a fé em família`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    type: 'website',
    locale: 'pt_BR',
    siteName: site.brand,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.brand }],
  },
  twitter: { card: 'summary_large_image', title, description: site.description, images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#0F4C5C', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3">
          Ir para o conteúdo
        </a>
        <AttributionCapture />
        <ActivityToasts />
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
