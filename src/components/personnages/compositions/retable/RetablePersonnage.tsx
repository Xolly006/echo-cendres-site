import Link from 'next/link';
import { getPersonnageSignature } from '@/components/personnages/signatures';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { RetableScene } from './RetableScene';
import { CagePersonnage } from '../cage/CagePersonnage';
import styles from './RetablePersonnage.module.css';

/**
 * Composition "retable".
 *
 * Traduction du Domaine Absolu d'Elias à 50 % de synchronisation :
 * GLORIA SANCTUS — L'HORIZON DES PROMESSES.
 *
 * "Ce n'est pas une église. C'est une Ville de Cristal en construction.
 *  Il y a des échafaudages de lumière. Il y a des statues représentant tous
 *  ceux qu'Elias n'a pas pu sauver, mais ici ils sont vivants, faits de
 *  lumière solide, et ils soutiennent les murs."
 *
 * Ce que la composition en tire :
 * - un retable : centré, frontal, symétrique, vertical. Contrairement à
 *   "fragment", le personnage EST le sujet de sa page ;
 * - en construction : rien n'est parfaitement aligné ni terminé. Les
 *   séparateurs s'interrompent, les marges sont irrégulières. L'inachevé
 *   est l'état normal, pas un défaut ;
 * - une seule source de lumière, basse et chaude, qui vacille. Elle a une
 *   direction : quelqu'un la tient ;
 * - la page respire : c'est un homme qui tient un seuil, en direct ;
 * - la règle du Domaine, "Le Mensonge est impossible", devient un
 *   comportement réel : cette fiche est la seule du site qui affiche ce
 *   qu'elle ne sait pas.
 *
 * La jauge de synchronisation est l'élément vital de la page : tant que le
 * nombre varie, l'hôte tient. C'est sur elle que se jouera la bascule vers
 * Métatron.
 */


/**
 * Le sceau d'Elias — la pupille gravée.
 *
 * Canon : "yeux bruns, dorés lorsqu'il use de ses pouvoirs, avec des
 * gravures de croix runiques dans la pupille."
 *
 * Une pupille, et dedans une croix runique. Rien d'autre. C'est son
 * équivalent de l'Ombre sans contour de Kael.
 */
function PupilleGravee() {
  return (
    <svg className={styles.sceau} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="retable-iris" cx="50%" cy="50%" r="50%">
          <stop offset="34%" stopColor="var(--character-accent)" stopOpacity="0.34" />
          <stop offset="72%" stopColor="var(--character-accent)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--character-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="52" fill="url(#retable-iris)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="var(--character-accent)" strokeWidth="0.9" opacity="0.5" />

      {/* La croix runique gravée dans la pupille. */}
      <g stroke="var(--character-accent)" strokeWidth="1.1" fill="none" opacity="0.85">
        <line x1="60" y1="34" x2="60" y2="86" />
        <line x1="42" y1="52" x2="78" y2="52" />
        <line x1="48" y1="76" x2="72" y2="76" />
        <line x1="52" y1="34" x2="68" y2="34" />
      </g>

      <circle cx="60" cy="60" r="7" fill="var(--character-accent)" opacity="0.28" />
    </svg>
  );
}

export function RetablePersonnage({
  backHref = '/personnages',
  backLabel = 'Retour aux personnages',
  narrative,
  personnage,
  previewStatus,
  entityPersonnage,
  entityNarrative,
}: PersonnageCompositionProps) {
  const identityItems = getIdentityDetails(personnage);
  const magicItems = getMagicDetails(personnage);
  const uncertainties = personnage.uncertainties ?? [];

  const signature = getPersonnageSignature(personnage.slug);
  const SignatureTitle = signature?.Title;
  const SignatureOverlay = signature?.Overlay;

  const entityPage =
    personnage.possession && entityPersonnage ? (
      <CagePersonnage
        personnage={entityPersonnage}
        narrative={entityNarrative}
        backHref={backHref}
        backLabel={backLabel}
        previewStatus={previewStatus}
      />
    ) : undefined;

  return (
    <RetableScene possession={personnage.possession} entityPage={entityPage}>
      <section className={styles.scene} aria-labelledby="personnage-title">
      <RevealAuDefilement />
      {/* Le sceau : FIXE, derrière tout le contenu, comme ceux d'Ysolde et
          de Métatron. Il ne défile pas — c'est un fond, pas un ornement. */}
      <PupilleGravee />

      {/* Une seule source, basse et chaude : "une lumière qui brûle comme
          des larmes". Elle a une direction — quelqu'un la tient. */}
      <div className={styles.lumiere} aria-hidden="true">
        <span className={styles.foyer} />
        <span className={styles.echafaudage} />
      </div>

      {SignatureOverlay ? <SignatureOverlay /> : null}

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill} data-status={previewStatus}>
              Preview {previewStatus}
            </span>
          ) : null}

          {/*
            Le nom est réellement SUBSTITUÉ, il n'est pas masqué.

            Les versions précédentes posaient un calque opaque par-dessus le
            titre de l'hôte : il fallait alors faire coïncider deux largeurs
            de texte différentes, et le nom de l'entité débordait de son
            fond. Ici, les deux noms sont deux éléments frères empilés dans
            la même cellule de grille. Chacun a son centrage, sa police et
            sa taille propres — aucun n'a à masquer l'autre.

            Le nom de l'hôte reste seul dans le flux du document pour les
            lecteurs d'écran : celui de l'entité est aria-hidden.
          */}
          <h1 id="personnage-title" className={styles.title}>
            <span className={styles.titreHote}>
              {SignatureTitle ? <SignatureTitle>{personnage.nom}</SignatureTitle> : personnage.nom}
            </span>
            {personnage.possession ? (
              <span className={styles.titreEntite} aria-hidden="true">
                {personnage.possession.entity}
              </span>
            ) : null}
          </h1>

          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
        </header>

        <div className={styles.summaryBlock}>
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
            <section className={styles.identity} aria-labelledby="personnage-identity-title"
            data-reveal>
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
            <section className={styles.magic} aria-labelledby="personnage-magic-title"
            data-reveal>
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

        {narrative ? <div className={styles.narrative}>{narrative}</div> : null}

        {/*
          "Dans cette zone, le Mensonge est impossible."
          La seule fiche du site qui déclare ses propres lacunes. Ce ne sont
          pas des éléments de lore : ce sont des constats sur l'état des
          sources, que seul le créateur peut trancher.
        */}
        {uncertainties.length > 0 ? (
          <section className={styles.incertitudes} aria-labelledby="personnage-uncertainties-title">
            <h2 id="personnage-uncertainties-title" className={styles.sectionTitle}>
              Ce que cette fiche ne sait pas
            </h2>
            <ul className={styles.incertitudesList}>
              {uncertainties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className={styles.exit}>
          <Link className={styles.backLink} href={backHref} data-personnage-exit>
            {backLabel}
          </Link>
        </div>
      </div>
      </section>
    </RetableScene>
  );
}
