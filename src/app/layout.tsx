import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk, Spectral } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';

const fontSerifTitre = Cormorant_Garamond({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-titre',
});

const fontSerifLecture = Spectral({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-lecture',
});

const fontGrotesqueUi = Space_Grotesk({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesque-ui',
});

export const metadata: Metadata = {
  title: "L’Écho des Cendres — Le Livre-Monde",
  description: "Atlas narratif interactif pour explorer personnages, lieux, événements et factions de L’Écho des Cendres.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontSerifTitre.variable} ${fontSerifLecture.variable} ${fontGrotesqueUi.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
