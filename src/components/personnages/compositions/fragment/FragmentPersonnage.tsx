import Link from 'next/link';
import { PersonnageParticles } from '@/components/personnages/effects/PersonnageParticles';
import { getPersonnageSignature } from '@/components/personnages/signatures';
import {
  getIdentityDetails,
  getMagicDetails,
  getUnrecordedDetails,
} from '@/components/personnages/compositions/content';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import styles from './FragmentPersonnage.module.css';

/**
 * Composition "fragment".
 *
 * Traduction d'un Domaine Absolu de privation : la Chambre Anéchoïque de
 * Kael l'Éclipsé. Le doc en donne la règle — "Tu es seul" — et la
 * conséquence : "Le noir absolu. Pas de sol, pas de ciel. Vous perdez la
 * vue, l'ouïe, l'odorat, le toucher et même la proprioception."
 *
 * Ce que la composition en tire, point par point :
 * - pas de sol ni de ciel  -> aucun repère spatial (ni halo, ni horizon,
 *   ni profondeur) ;
 * - perte du toucher       -> aucun état de survol ; la page ne répond pas
 *   à la main. :focus-visible reste intact, la navigation clavier n'est
 *   jamais sacrifiée à une mise en scène ;
 * - "Tu es seul"           -> la fiche documente un poste, pas un homme :
 *   le rôle occupe la place du titre, le nom est relégué en marge ;
 * - l'Ancre, "une ombre sans contour, une forme qui n'a pas de nom"
 *                          -> aucune bordure nulle part, et un sceau
 *   dessiné uniquement par un rempli qui s'éteint.
 *
 * Le récit MDX reste parfaitement composé et lisible : c'est le seul
 * endroit où quelqu'un a pris la peine de l'écrire.
 *
 * Les ancrages `data-personnage-content` et `data-personnage-exit` sont
 * fournis ici, en JSX, pour que les signatures cessent de deviner la
 * structure du DOM.
 */

function OmbreSansContour() {
  return (
    <svg className={styles.sigil} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fragment-sigil-core" cx="50%" cy="46%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="52%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fragment-sigil-halo" cx="50%" cy="50%" r="50%">
          <stop offset="58%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="80%" stopColor="currentColor" stopOpacity="0.09" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Aucun stroke : la forme n'a pas de contour, elle n'a qu'une densité. */}
      <ellipse cx="60" cy="56" rx="27" ry="38" fill="url(#fragment-sigil-core)" />
      <circle cx="60" cy="60" r="58" fill="url(#fragment-sigil-halo)" />
    </svg>
  );
}

export function FragmentPersonnage({
  atmosphere,
  backHref = '/personnages',
  backLabel = 'Retour aux personnages',
  narrative,
  personnage,
  previewStatus,
}: PersonnageCompositionProps) {
  const identityItems = getIdentityDetails(personnage);
  const unrecordedItems = getUnrecordedDetails(personnage);
  const magicItems = getMagicDetails(personnage);

  const signature = getPersonnageSignature(personnage.slug);
  const SignatureTitle = signature?.Title;
  const SignatureOverlay = signature?.Overlay;

  return (
    <section className={styles.scene} aria-labelledby="personnage-title">
      {/* Pas de PersonnageAtmosphere : ses halos et ses traces dessinent un
          ciel et une profondeur. Le Domaine dit "pas de sol, pas de ciel".
          Seules subsistent les particules et la fumée de la signature. */}
      <PersonnageParticles atmosphere={atmosphere} />
      {SignatureOverlay ? <SignatureOverlay /> : null}

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          <OmbreSansContour />

          {/* Le rôle occupe visuellement la place du titre : la page
              documente une fonction, pas une personne. */}
          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>

          {/* Le nom reste le h1 pour la structure du document et les
              lecteurs d'écran, mais il est relégué : petit, en marge,
              comme une annotation ajoutée après coup. */}
          <h1 id="personnage-title" className={styles.title}>
            {SignatureTitle ? <SignatureTitle>{personnage.nom}</SignatureTitle> : personnage.nom}
          </h1>

          {previewStatus ? (
            <span className={styles.previewPill} data-status={previewStatus}>
              Preview {previewStatus}
            </span>
          ) : null}
        </header>

        <div className={styles.summaryBlock}>
          <p className={styles.summary} data-personnage-erasable>{personnage.resumeCourt}</p>

          {personnage.tags && personnage.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="Tags du personnage">
              {personnage.tags.map((tag) => (
                <li key={tag} data-personnage-withdrawable>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <Link className={styles.backLink} href={backHref} data-personnage-exit>
            {backLabel}
          </Link>
        </div>

        {identityItems.length > 0 || unrecordedItems.length > 0 ? (
          <section className={styles.identity} aria-labelledby="personnage-identity-title">
            <h2 id="personnage-identity-title" className={styles.sectionTitle}>
              Identité
            </h2>
            <dl className={styles.identityList}>
              {identityItems.map((item) => (
                <div className={styles.identityItem} key={item.key}>
                  <dt>{item.label}</dt>
                  <dd data-personnage-erasable>{item.value}</dd>
                </div>
              ))}
              {unrecordedItems.map((item) => (
                <div className={styles.identityItem} key={item.key} data-unrecorded>
                  <dt>{item.label}</dt>
                  {/* Aucun marqueur visible : un tiret dirait "il manque
                      quelque chose ici", ce qui est l'inverse de la
                      Non-existence. La case existe, elle est simplement
                      vide. L'information reste accessible aux lecteurs
                      d'écran. */}
                  <dd>
                    <span className={styles.srOnly}>non consigné</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {magicItems.length > 0 ? (
          <section className={styles.magic} aria-labelledby="personnage-magic-title">
            <h2 id="personnage-magic-title" className={styles.sectionTitle}>
              Magie
            </h2>
            <dl className={styles.magicList}>
              {magicItems.map((item) => (
                <div className={styles.magicItem} key={item.key}>
                  <dt>{item.label}</dt>
                  <dd data-personnage-erasable>
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
      </div>
    </section>
  );
}
