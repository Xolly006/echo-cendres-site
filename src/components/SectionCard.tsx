import Link from 'next/link';
import type { HomeSection } from '@/data/sections';

export function SectionCard({ section }: { section: HomeSection }) {
  const statusLabel = section.status === 'vide' ? 'Emplacement prêt' : section.status === 'pret' ? 'Disponible' : 'Bientôt';

  return (
    <Link className="section-card" href={section.href} aria-label={`Ouvrir la section ${section.title}`}>
      <span className="section-card__status">{statusLabel}</span>
      <span className="section-card__eyebrow">{section.eyebrow}</span>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      <span className="section-card__arrow" aria-hidden="true">→</span>
    </Link>
  );
}
