import Link from 'next/link';
import type { CSSProperties } from 'react';
import { archeStrates } from '@/themes/personnages/arche';
import type { FactionCompositionProps } from '../types';
import { PalimpsesteFond } from './PalimpsesteFond';
import styles from './PalimpsesteFaction.module.css';

/**
 * Composition "palimpseste" — L'Ordre de l'Arquet (docs/ARQUET_COMPOSITION.md).
 *
 * Étape 2 : le socle (largeur de colonne, marges, rythme vertical, titres
 * de section, traitement du récit), repris de
 * StandardImmersivePersonnage.module.css et PersonnageNarrative.module.css.
 *
 * Étape 4 : les cinq strates du récit (§1) en CSS statique — corps,
 * intitulés, colonne, accent et couleur de texte dérivent d'une section
 * MDX à l'autre (`h2:nth-of-type` dans PalimpsesteFaction.module.css).
 * `strataVars` expose accent/texte/fond de `archeStrates` en variables
 * CSS sur le conteneur du récit ; aucune interpolation, aucune
 * transition — la continuité vient de la faible différence entre strates
 * voisines. Aucun bloc de texte ne porte de background-color (correction
 * du 2026-08-11 : c'était un conteneur fermé, règle du 2026-07-29) ; le
 * fond de page reste uniforme. L'irréversibilité du cadre (§2) n'est pas
 * implémentée : c'est une étape séparée, non commencée.
 *
 * Étape 5 : les cinq images (§5), corrigée le 2026-08-12. Premier essai :
 * des bandes insérées dans le flux du récit — abandonné, erreur de
 * conception. Modèle repris à la place : `PalimpsesteFond`
 * (src/components/personnages/effects/PersonnageFond.tsx généralisé à
 * cinq images), un fond fixe plein écran qui ne défile pas et change
 * d'image au fil de la lecture. `histoire.mdx` reste du Markdown pur,
 * sans aucune référence à une image.
 *
 * Tous les membres de `faction.membres` sont rendus, dans leur ordre de
 * déclaration, sans filtrage ni total écrit en dur : Astraevor, Veyran et
 * les sept sièges du Conseil y sont, avec l'historique des successions.
 * Contenu jamais masqué, lisible sans JavaScript.
 */
const strataVars = Object.fromEntries(
  archeStrates.flatMap((strate, index) => [
    [`--strata-${index + 1}-accent`, strate.accent],
    [`--strata-${index + 1}-text`, strate.text],
    [`--strata-${index + 1}-bg`, strate.background],
  ]),
) as CSSProperties;

export function PalimpsesteFaction({
  faction,
  backHref = '/factions',
  backLabel = 'Retour aux factions',
  narrative,
  previewStatus,
}: FactionCompositionProps) {
  return (
    <section className={styles.scene} aria-labelledby="faction-title">
      <PalimpsesteFond images={faction.images ?? []} />

      <div className={styles.content}>
        <header className={styles.intro}>
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

        <section className={styles.membres} aria-labelledby="faction-membres-title">
          <div className={styles.sectionHeader}>
            <h2 id="faction-membres-title" className={styles.sectionTitle}>
              Membres
            </h2>
            <p>Depuis Astraevor jusqu'au dernier siège pourvu, sans distinction de statut.</p>
          </div>
          <ul className={styles.membresList}>
            {faction.membres.map((membre) => (
              <li key={membre.nom} className={styles.membre}>
                <p className={styles.membreNom}>{membre.nom}</p>
                {membre.titre ? <p className={styles.membreTitre}>{membre.titre}</p> : null}
                {membre.concept ? <p className={styles.membreConcept}>{membre.concept}</p> : null}
                <p className={styles.membreMeta}>
                  {membre.rang ? `${membre.rang} · ` : ''}
                  {membre.statut}
                  {membre.remplace ? ` · remplace ${membre.remplace}` : ''}
                  {membre.remplacePar ? ` · remplacé par ${membre.remplacePar}` : ''}
                </p>
                {membre.notes ? <p className={styles.membreNotes}>{membre.notes}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        {faction.mecanique ? (
          <section className={styles.mecanique} aria-labelledby="faction-mecanique-title">
            <div className={styles.sectionHeader}>
              <h2 id="faction-mecanique-title" className={styles.sectionTitle}>
                {faction.mecanique.nom}
              </h2>
            </div>
            <p className={styles.proseParagraph}>{faction.mecanique.principe}</p>
          </section>
        ) : null}

        {faction.branches && faction.branches.length > 0 ? (
          <section className={styles.branches} aria-labelledby="faction-branches-title">
            <div className={styles.sectionHeader}>
              <h2 id="faction-branches-title" className={styles.sectionTitle}>
                Branches
              </h2>
            </div>
            <ul className={styles.branchesList}>
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
          <section className={styles.narrative} aria-labelledby="faction-narrative-title">
            <div className={styles.sectionHeader}>
              <h2 id="faction-narrative-title" className={styles.sectionTitle}>
                Récit
              </h2>
            </div>
            <div className={styles.narrativeContent} style={strataVars}>
              {narrative}
            </div>
          </section>
        ) : null}

        <p className={styles.backLinkWrap}>
          <Link className={styles.backLink} href={backHref}>
            {backLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
