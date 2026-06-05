import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: "L’Écho des Cendres — Le Livre-Monde",
  description: "Atlas narratif interactif pour explorer personnages, lieux, événements et factions de L’Écho des Cendres.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
