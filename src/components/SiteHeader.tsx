import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/personnages', label: 'Personnages' },
  { href: '/carte', label: 'Carte' },
  { href: '/chronologie', label: 'Chronologie' },
  { href: '/evenements', label: 'Événements' },
  { href: '/factions', label: 'Factions' },
  { href: '/magie', label: 'Magie' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Retour à l’accueil de L’Écho des Cendres">
        <span className="brand-mark">✦</span>
        <span>L’Écho des Cendres</span>
      </Link>
      <nav className="site-nav" aria-label="Navigation principale">
        {NAV_ITEMS.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
