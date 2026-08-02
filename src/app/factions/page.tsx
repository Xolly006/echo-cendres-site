import Link from 'next/link';
import { getAllFactions } from '@/lib/factions';

// Index réel, volontairement minimal : pas de DA, pas de composition
// (docs/FACTIONS_MODELE.md §5). Miroir de /personnages : seules les
// factions publiées apparaissent en production.

export default async function Page() {
  const factions = await getAllFactions();

  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="factions-title">
        <p className="eyebrow">Registre préparé</p>
        <h1 id="factions-title">Factions</h1>
        <p>
          Les factions seront ajoutées progressivement depuis une source de données unique, sans créer une page à la main
          pour chaque entrée.
        </p>

        {factions.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune faction publiée pour le moment.</strong>
            <span>
              Les fiches en brouillon restent invisibles tant qu’elles ne sont pas validées pour publication.
            </span>
          </div>
        ) : (
          <ul aria-label="Liste des factions">
            {factions.map((faction) => (
              <li key={faction.slug}>
                <Link href={`/factions/${faction.slug}`}>{faction.nom}</Link> — {faction.resume}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
