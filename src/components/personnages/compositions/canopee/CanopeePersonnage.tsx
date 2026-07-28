import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { Lianes } from './Lianes';
import { VisiteursDeLaCanopee } from './VisiteursDeLaCanopee';
import styles from './CanopeePersonnage.module.css';

/**
 * Composition "canopée" — la jungle qu'elle a créée.
 *
 * Le verbe d'Ysolde : LA PAGE SE PASSE DE TOI. Pas par refus (ça, c'est
 * Kael) — par occupation. Une forêt vivante a d'autres deuils que ta
 * visite. Rien ne réagit au survol, tout continue de pousser que tu
 * regardes ou non.
 *
 * Partis pris, tous tirés du doc :
 * - structure organique : pas de grille stricte, les blocs ont des
 *   largeurs inégales comme des clairières, le flux serpente ;
 * - la sève dorée : le vert profond est veiné d'or — elle saigne de la
 *   sève dorée, son aura est "verte et dorée" ;
 * - les lianes poussent sur les titres et continuent pendant la lecture ;
 * - "Croissance." : les blocs déjà lus sont progressivement repris par
 *   la mousse — ce que tu abandonnes derrière toi, la forêt le reprend ;
 * - la pluie de Bora et le papillon bleu de Dayu traversent parfois la
 *   page : sa jungle est habitée par ses liens ;
 * - la fin de page se désature vers la cendre — et au milieu du gris,
 *   une seule pousse verte perce. Le lecteur descend vers le deuil et
 *   trouve une naissance. C'est la scène d'Ibuki, traduite en page.
 *
 * Le sceau — la Spirale de Croissance — est en arrière-plan, grand,
 * animé d'une rotation imperceptible : une fougère qui se déroule sur
 * un cycle très long. La forêt ne se presse pas.
 */

function SpiraleDeCroissance() {
  /*
   * Le sceau d'Ysolde : une crosse de fougère (fiddlehead) — la spirale
   * que fait toute pousse avant de se déplier. C'est la Croissance à
   * l'état pur : ni fleur, ni arbre — le geste de pousser lui-même.
   * Aucun contour fermé : des courbes qui s'enroulent, veinées d'or.
   */
  const turns: string[] = [];
  // Spirale d'Archimède approximée en arcs — générée statiquement pour
  // éviter toute divergence d'hydratation.
  let r = 4;
  let angle = 0;
  let x = 60;
  let y = 60;
  let path = `M ${x} ${y}`;
  for (let i = 0; i < 26; i++) {
    angle += Math.PI / 3.2;
    r += 2.6;
    x = 60 + Math.cos(angle) * r;
    y = 60 + Math.sin(angle) * r;
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  turns.push(path);

  return (
    <svg className={styles.sceau} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="canopee-seve" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--character-accent)" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#caa64a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--character-accent)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <g className={styles.sceauSpirale}>
        <path
          d={turns[0]}
          fill="none"
          stroke="url(#canopee-seve)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trois frondes secondaires qui se déroulent depuis la spirale. */}
        <path
          d="M 60 60 Q 46 40 30 36 Q 40 46 44 58"
          fill="none"
          stroke="var(--character-accent)"
          strokeWidth="0.9"
          opacity="0.5"
        />
        <path
          d="M 60 60 Q 78 74 92 72 Q 80 64 72 54"
          fill="none"
          stroke="var(--character-accent)"
          strokeWidth="0.9"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

export function CanopeePersonnage({
  backHref = '/personnages',
  backLabel = 'Retour aux personnages',
  narrative,
  personnage,
  previewStatus,
}: PersonnageCompositionProps) {
  const identityItems = getIdentityDetails(personnage);
  const magicItems = getMagicDetails(personnage);

  return (
    <section className={styles.scene} aria-labelledby="personnage-title">
      <RevealAuDefilement />
      {/* Le sceau : grand, en arrière-plan, en rotation imperceptible. */}
      <SpiraleDeCroissance />

      {/* La brume, la pluie de Bora, le papillon de Dayu. */}
      <VisiteursDeLaCanopee />

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          <h1 id="personnage-title" className={styles.title}>
            <Lianes>{personnage.nom}</Lianes>
          </h1>

          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
        </header>

        <div className={styles.clairiere} data-canopee-lisible>
          <p className={styles.summary}>{personnage.resumeCourt}</p>

          {personnage.tags && personnage.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="Tags du personnage">
              {personnage.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {identityItems.length > 0 ? (
          <section
            className={`${styles.clairiere} ${styles.clairiereDecalee}`}
            aria-labelledby="personnage-identity-title"
            data-reveal
            data-canopee-lisible
          >
            <h2 id="personnage-identity-title" className={styles.sectionTitle}>
              <Lianes small>Identité</Lianes>
            </h2>
            <dl className={styles.identityList}>
              {identityItems.map((item) => (
                <div className={styles.identityItem} key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {magicItems.length > 0 ? (
            <section
            className={styles.clairiere}
            aria-labelledby="personnage-magic-title"
            data-reveal
            data-canopee-lisible
          >
            <h2 id="personnage-magic-title" className={styles.sectionTitle}>
              <Lianes small>Magie</Lianes>
            </h2>
            <dl className={styles.magicList}>
              {magicItems.map((item) => (
                <div className={styles.magicItem} key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.value ? <p>{item.value}</p> : null}
                    {item.values ? (
                      <ul>
                        {item.values.map((value) => (
                          <li key={value}>{value}</li>
                        ))}
                      </ul>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {narrative ? (
          <div className={`${styles.clairiere} ${styles.cendres}`} data-canopee-lisible>
            <div className={styles.narrative}>{narrative}</div>

            {/* Au bout du gris : une pousse. Le lecteur descend vers le
                deuil et trouve une naissance. */}
            <svg
              className={styles.pousse}
              viewBox="0 0 60 90"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className={styles.pousseTige}
                d="M 30 88 C 30 66 30 52 30 42 C 30 32 24 26 18 24"
                fill="none"
                stroke="var(--character-accent)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                className={styles.pousseFeuille}
                d="M 30 50 C 38 46 44 38 45 30 C 37 33 31 40 30 50 Z"
                fill="var(--character-accent)"
                opacity="0.7"
              />
            </svg>
          </div>
        ) : null}

        <div className={styles.exit}>
          <Link className={styles.backLink} href={backHref} data-personnage-exit>
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
