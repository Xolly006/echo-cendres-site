import { ParticleAsh } from '@/components/ParticleAsh';
import { SectionCard } from '@/components/SectionCard';
import { HOME_SECTIONS } from '@/data/sections';

export default function HomePage() {
  return (
    <main className="home-shell">
      <ParticleAsh />
      <section className="hero" aria-labelledby="hero-title">
        <p className="hero__kicker">Le Livre-Monde</p>
        <h1 id="hero-title" className="hero__title">L’Écho des Cendres</h1>
        <p className="hero__subtitle">
          Un atlas narratif pour explorer les personnages, les lieux, les événements et les fractures d’un monde qui refuse poliment de rester simple.
        </p>
        <div className="hero__actions" aria-label="Actions principales">
          <a className="primary-action" href="#sections">Entrer dans le Livre-Monde</a>
          <a className="secondary-action" href="/archives">Voir les archives</a>
        </div>
      </section>

      <section id="sections" className="sections" aria-labelledby="sections-title">
        <div className="section-heading">
          <p className="eyebrow">Portes d’entrée</p>
          <h2 id="sections-title">Choisir une section</h2>
          <p>
            Pour l’instant, les salles sont vides. C’est normal. On construit le palais avant d’inviter les tragédies à prendre le thé.
          </p>
        </div>
        <div className="section-grid">
          {HOME_SECTIONS.map((section) => (
            <SectionCard section={section} key={section.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
