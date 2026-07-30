import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { PersonnageFond } from '@/components/personnages/effects/PersonnageFond';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { Reciprocite } from './Reciprocite';
import styles from './AgapePersonnage.module.css';

/**
 * Composition "agapè" — Le Mariage des Âmes.
 *
 * Le verbe d'Amara : LA PAGE PREND TA DOULEUR — ET TE REND CELLE DES
 * AUTRES.
 *
 * Elle est le seul personnage bienveillant du site, et pourtant sa page
 * doit être difficile à supporter. Pas hostile : lourde de la peine de
 * quelqu'un d'autre.
 *
 * Canon, et ce n'est pas de la tendresse : "Un général a essayé. Amara a
 * activé son 3ᵉ Éveil. Le général a ressenti, en une seconde, la
 * tristesse de tous les orphelins qu'il avait créés. Son esprit s'est
 * brisé. Il a passé le reste de sa vie à planter des fleurs dans le
 * jardin d'Amara." C'est une arme qui laisse ses victimes vivantes et
 * changées à jamais — le rose sucré serait un contresens.
 *
 * Ni Arquet ni Pilier : un électron libre, percutée à la naissance par le
 * Concept LIEN. Elle n'a donc pas d'Ancre, et son sceau lui appartient en
 * propre.
 *
 * Ce que la composition tire du canon :
 *
 *  - LA RÉCIPROCITÉ. "Nous sommes Un." Ce que le lecteur réchauffe est
 *    payé ailleurs sur la page. Rien n'est gratuit.
 *  - LA LETTRE. Colonne étroite, interlignage large, italique : une
 *    lettre écrite à la main — à quelqu'un qui ne la lira jamais.
 *  - LE BATTEMENT PARTAGÉ. Une pulsation lente traverse toute la page au
 *    même rythme. Pas un coeur : deux, synchronisés.
 *  - LE JARDIN. En bas de page, là où les autres fiches finissent en
 *    cendres ou en or, des fleurs poussent. Sans commentaire. Celui qui
 *    les a plantées y a passé sa vie.
 */

function DeuxCercles() {
  /*
   * Le sceau : deux cercles qui se recouvrent — une vesica piscis.
   * Deux présences distinctes dont les auras se confondent, et
   * l'intersection est plus lumineuse que les deux réunies. C'est
   * exactement le Mariage des Âmes : ni fusion, ni séparation.
   */
  return (
    <svg className={styles.sceau} viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="agape-aura" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="var(--character-accent)" stopOpacity="0.22" />
          <stop offset="88%" stopColor="var(--character-accent)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--character-accent)" stopOpacity="0" />
        </radialGradient>
        {/* L'intersection : la seule zone vraiment lumineuse. */}
        <clipPath id="agape-intersection">
          <circle cx="160" cy="150" r="98" />
        </clipPath>
      </defs>

      <circle cx="160" cy="150" r="98" fill="url(#agape-aura)" />
      <circle cx="240" cy="150" r="98" fill="url(#agape-aura)" />

      <g clipPath="url(#agape-intersection)">
        <circle cx="240" cy="150" r="98" fill="var(--character-accent)" opacity="0.16" />
      </g>

      <circle
        cx="160"
        cy="150"
        r="98"
        fill="none"
        stroke="var(--character-accent)"
        strokeWidth="1.4"
        opacity="0.5"
      />
      <circle
        cx="240"
        cy="150"
        r="98"
        fill="none"
        stroke="var(--character-accent)"
        strokeWidth="1.4"
        opacity="0.5"
      />
    </svg>
  );
}

function JardinDuGeneral() {
  /*
   * "Il est tombé à genoux et a passé le reste de sa vie à planter des
   * fleurs dans le jardin d'Amara."
   *
   * Sept fleurs simples, inégales, sans symétrie — plantées à la main par
   * quelqu'un qui n'avait jamais fait ça. Aucun texte ne les explique.
   */
  const fleurs = [
    { x: 24, h: 34, t: 0 },
    { x: 58, h: 46, t: 1.7 },
    { x: 92, h: 28, t: 0.8 },
    { x: 126, h: 41, t: 2.4 },
    { x: 158, h: 33, t: 1.1 },
    { x: 194, h: 48, t: 3.1 },
    { x: 228, h: 30, t: 2 },
  ];

  return (
    <svg className={styles.jardin} viewBox="0 0 252 60" aria-hidden="true" focusable="false">
      {fleurs.map((f) => (
        <g key={f.x} className={styles.fleur} style={{ animationDelay: `${f.t}s` }}>
          <path
            d={`M ${f.x} 58 C ${f.x - 3} ${58 - f.h * 0.5} ${f.x + 3} ${58 - f.h * 0.7} ${f.x} ${58 - f.h}`}
            fill="none"
            stroke="var(--character-accent)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
          />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={f.x}
              cy={58 - f.h - 3.4}
              rx="2"
              ry="3.6"
              transform={`rotate(${a} ${f.x} ${58 - f.h})`}
              fill="var(--character-accent)"
              opacity="0.42"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function AgapePersonnage({
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
      <Reciprocite />

      <PersonnageFond
        fond={personnage.images?.fond}
        fondSecondaire={personnage.images?.fondSecondaire}
        intensite={0.66}
      />

      <DeuxCercles />

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          {/* Le nom bat. Pas un effet : un signe vital. */}
          <h1 id="personnage-title" className={styles.title}>
            <span className={styles.titreCoeur}>{personnage.nom}</span>
          </h1>

          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
        </header>

        <div className={styles.bloc} data-partage>
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
            data-partage
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
          <section
            className={styles.bloc}
            aria-labelledby="personnage-magic-title"
            data-reveal
            data-partage
          >
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
          <div className={styles.bloc} data-reveal data-partage>
            <div className={styles.narrative}>{narrative}</div>
          </div>
        ) : null}

        {/* Le jardin. Aucun texte ne l'explique. */}
        <JardinDuGeneral />

        <div className={styles.exit}>
          <Link className={styles.backLink} href={backHref} data-personnage-exit>
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
