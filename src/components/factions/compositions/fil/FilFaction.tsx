import Link from 'next/link';
import type { FactionCompositionProps } from '../types';
import { Fils } from './Fils';
import { Siege } from './Siege';
import styles from './FilFaction.module.css';

/**
 * Composition "fil" — L'Ordre de l'Arquet (docs/ARQUET_COMPOSITION.md).
 *
 * Un fil par membre en poste (hors Cercle Zéro et Façade) converge vers
 * Veyran l'Oracle. Le nombre de sièges est entièrement dérivé de
 * `faction.membres` : aucun total écrit en dur, aucune numérotation
 * (§1, §11 — critère de refus explicite).
 *
 * Sièges, Veyran et Astraevor sont dans le HTML dès le rendu serveur,
 * lisibles sans JavaScript (étape 3). Les fils SVG (étape 4, ce fichier)
 * sont une couche décorative purement client, aria-hidden : leur absence
 * (JS désactivé) ne retire aucune information, seulement la mise en scène
 * (§11 — critère de refus explicite).
 *
 * Aucune interaction de substitution encore (étape 5), aucune révélation
 * ni amplification de rythme (étapes 6-7).
 */
export function FilFaction({
  faction,
  backHref = '/factions',
  backLabel = 'Retour aux factions',
  narrative,
  previewStatus,
}: FactionCompositionProps) {
  const astraevor = faction.membres.find((membre) => membre.rang === 'Cercle Zéro');
  const veyran = faction.membres.find((membre) => membre.rang === 'Façade');
  const sieges = faction.membres.filter(
    (membre) => membre.statut === 'en-poste' && membre.rang !== 'Façade' && membre.rang !== 'Cercle Zéro',
  );

  return (
    <section className={styles.scene} aria-labelledby="faction-title">
      {astraevor ? (
        <div className={styles.astraevorSlot}>
          <p className={styles.astraevorLabel}>{astraevor.rang}</p>
          <p className={styles.astraevorName} data-astraevor-name="">
            {astraevor.nom}
          </p>
          {astraevor.notes ? <p className={styles.astraevorNote}>{astraevor.notes}</p> : null}
        </div>
      ) : null}

      <header className={styles.header}>
        {previewStatus ? (
          <span className={styles.previewPill} data-status={previewStatus}>
            Preview {previewStatus}
          </span>
        ) : null}
        <p className={styles.eyebrow}>
          {faction.statut} — {faction.ere}
        </p>
        <h1 id="faction-title" className={styles.title}>
          {faction.nom}
        </h1>
        {faction.epithete ? <p className={styles.epithete}>{faction.epithete}</p> : null}
        <p className={styles.resume}>{faction.resume}</p>
      </header>

      {veyran ? (
        <div className={styles.veyran}>
          <p className={styles.veyranLabel}>{veyran.rang}</p>
          <p className={styles.veyranName} data-veyran-name="">
            {veyran.nom}
            {veyran.titre ? ` — ${veyran.titre}` : ''}
          </p>
          {veyran.notes ? <p className={styles.veyranNote}>{veyran.notes}</p> : null}
        </div>
      ) : null}

      <Fils sieges={sieges} />

      <ul className={styles.sieges} aria-label="Conseil des Héritiers">
        {sieges.map((membre) => (
          <Siege key={membre.nom} membre={membre} />
        ))}
      </ul>

      {faction.mecanique || (faction.branches && faction.branches.length > 0) || narrative ? (
        <div className={styles.body}>
          {faction.mecanique ? (
            <section className={styles.mecanique}>
              <h2 className={styles.sectionLabel}>{faction.mecanique.nom}</h2>
              <p>{faction.mecanique.principe}</p>
            </section>
          ) : null}

          {faction.branches && faction.branches.length > 0 ? (
            <section className={styles.branches}>
              <h2 className={styles.sectionLabel}>Branches</h2>
              <ul>
                {faction.branches.map((branche) => (
                  <li key={branche.nom}>
                    <strong>{branche.nom}</strong> — {branche.role}
                    {branche.commandePar ? ` (commandée par ${branche.commandePar.join(', ')})` : ''}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {narrative ? (
            <section className={styles.narrative}>
              <h2 className={styles.sectionLabel}>Récit</h2>
              <div className={styles.narrativeContent}>{narrative}</div>
            </section>
          ) : null}
        </div>
      ) : null}

      <p className={styles.backLinkWrap}>
        <Link className={styles.backLink} href={backHref}>
          {backLabel}
        </Link>
      </p>
    </section>
  );
}
