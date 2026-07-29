import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { PersonnageFond } from '@/components/personnages/effects/PersonnageFond';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { BrasGauche } from './BrasGauche';
import { Runes } from './Runes';
import styles from './TitanPersonnage.module.css';

/**
 * Composition "titan".
 *
 * Le verbe de Varros : LA PAGE PÈSE — ET ELLE TE FRAPPE ALORS QU'ELLE NE
 * VEUT PAS.
 *
 * Ce n'est pas un berserker. C'est un homme doux enfermé dans une machine
 * qui tue toute seule : "il est piégé dans un corps de monstre berserker
 * qui tue automatiquement tout ce qui bouge, mais à l'intérieur, il est
 * toujours ce fermier doux qui hurle pour que ça s'arrête."
 *
 * La page a donc DEUX CORPS :
 *  - le contenu, lourd et lent, aux marges épaisses : l'homme ;
 *  - la bande rouge du bras gauche, qui pulse et frappe sans que personne
 *    ne l'ait décidé : la Bête.
 *
 * Et deux images racontent son trajet : le champ de blé de l'homme qu'il
 * était cède, au fil du défilement, au cratère de ce qu'il est devenu.
 *
 * Son Ancre — "les chaînes brisées, symbole de la liberté qu'il a toujours
 * voulue sans jamais l'obtenir" — est son sceau, fixe en arrière-plan,
 * comme la Pupille d'Elias ou la Spirale d'Ysolde.
 */

function ChainesBrisees() {
  /*
   * Une vraie chaîne, pas une file d'anneaux.
   *
   * Trois choses la rendent lisible comme telle :
   *  - les maillons ALTERNENT d'orientation. Un maillon sur deux est vu
   *    par la tranche : on le dessine deux fois plus étroit. C'est cette
   *    alternance qui donne le volume ;
   *  - ils se CHEVAUCHENT. Le pas est plus court que la longueur d'un
   *    maillon, donc chacun mord sur le suivant ;
   *  - chaque maillon a un contour ET un jour intérieur : c'est du métal
   *    épais, pas un trait.
   *
   * La chaîne court en DIAGONALE d'un bord à l'autre, ce qui la rend
   * indépendante de la colonne de texte — plus de problème de centrage.
   * Elle se rompt au milieu, et il en reste des éclats.
   */
  const PAS = 30;
  const maillons = [];

  for (let i = 0; i < 16; i++) {
    // Le trou : les maillons 7 et 8 manquent, la chaîne est rompue là.
    if (i === 7 || i === 8) continue;

    const t = i / 15;
    const x = 40 + t * 320;
    const y = 30 + t * 340;
    const deTranche = i % 2 === 1;
    const rx = deTranche ? 5.5 : 13;
    const ry = 21;
    const opacite = 0.85 - Math.abs(t - 0.5) * 0.35;

    maillons.push(
      <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(47)`} opacity={opacite}>
        <rect
          x={-rx}
          y={-ry}
          width={rx * 2}
          height={ry * 2}
          rx={rx}
          ry={rx}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <rect
          x={-rx + 2.6}
          y={-ry + 2.6}
          width={(rx - 2.6) * 2}
          height={(ry - 2.6) * 2}
          rx={rx - 2.6}
          ry={rx - 2.6}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
      </g>,
    );
  }

  // Les deux maillons ouverts, de part et d'autre de la rupture.
  const ouverts = [
    { x: 190, y: 190, rot: 47, sens: 1 },
    { x: 250, y: 254, rot: 47, sens: -1 },
  ];

  // Les éclats projetés par la rupture.
  const eclats = [
    [214, 206, 8], [232, 216, -14], [206, 228, 22], [240, 194, 5],
    [222, 240, -8], [196, 210, 30], [248, 228, -20], [228, 186, 12],
    [210, 246, -26], [244, 210, 16],
  ];

  return (
    <svg className={styles.sceau} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {maillons}

      {ouverts.map(({ x, y, rot, sens }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rot})`} opacity="0.8">
          {/* Un maillon rompu : un arc ouvert, aux extrémités déchirées. */}
          <path
            d={
              sens > 0
                ? 'M 13 -8 A 13 13 0 0 0 -13 -8 L -13 12'
                : 'M -13 8 A 13 13 0 0 0 13 8 L 13 -12'
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      ))}

      <g fill="currentColor" opacity="0.55">
        {eclats.map(([x, y, rot]) => (
          <path
            key={`${x}-${y}`}
            d="M 0 0 L 6 2 L 2 7 Z"
            transform={`translate(${x} ${y}) rotate(${rot})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function TitanPersonnage({
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

      <PersonnageFond
        fond={personnage.images?.fond}
        fondSecondaire={personnage.images?.fondSecondaire}
        intensite={0.78}
      />

      <ChainesBrisees />

      {/* Le bras gauche : il pulse, et il frappe sans prévenir. */}
      <BrasGauche />

      {/* La buée : "sa peau fumait sous le froid". Ce n'est pas de la
          fumée — c'est la chaleur d'un corps qui s'échappe. */}
      <div className={styles.buee} aria-hidden="true">
        <span />
        <span data-nappe="2" />
      </div>

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          <h1 id="personnage-title" className={styles.title}>
            {personnage.nom}
          </h1>

          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
        </header>

        <div className={styles.bloc}>
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
            className={styles.bloc}
            aria-labelledby="personnage-identity-title"
            data-reveal
          >
            <h2 id="personnage-identity-title" className={styles.sectionTitle}>
              Identité
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
          <section className={styles.bloc} aria-labelledby="personnage-magic-title" data-reveal>
            <h2 id="personnage-magic-title" className={styles.sectionTitle}>
              Magie
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
          <div className={styles.bloc} data-reveal>
            <div className={styles.narrative}>{narrative}</div>
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
