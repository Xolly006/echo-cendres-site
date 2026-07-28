import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { RoueDeFeu } from './RoueDeFeu';
import { Colonnes } from './Colonnes';
import styles from './CagePersonnage.module.css';

/**
 * Composition "cage".
 *
 * Domaine Absolu : LA CAGE DORÉE — "une architecture parfaite de lumière :
 * colonnes, arches, géométries sacrées à l'infini. Chaque règle physique
 * est remplacée par une règle de Métatron."
 *
 * Le principe fondateur vient de la définition des anges dans le doc :
 *
 *   "Chaque Ange est une Loi physique faite conscience. Leur vraie forme
 *    est une manifestation géométrique de ce qu'ils SONT, pas de ce qu'ils
 *    ressemblent."
 *
 * Cette page ne représente donc pas Métatron. Elle EST sa géométrie. D'où
 * les partis pris :
 *
 * - pas de retable, pas de centre de dévotion : on n'est pas DEVANT lui,
 *   on est DEDANS. Un cadre fixe encadre en permanence le viewport ;
 * - pas de portrait : un registre numéroté. Il n'a pas de biographie, il
 *   a des entrées ;
 * - aucune ombre : "la lumière vient de partout, donc de nulle part" ;
 * - la gravité s'inverse — tout ce qui dérive monte ;
 * - la Roue est trop grande pour le cadre. On n'en voit qu'un arc, coupé
 *   par les bords : une roue entière et centrée serait un logo, un
 *   fragment qui déborde est une présence.
 */

export function CagePersonnage({
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
      <RoueDeFeu />
      <Colonnes />

      {/* Le cadre : on n'observe pas la Cage, on est à l'intérieur. */}
      <div className={styles.cadre} aria-hidden="true">
        <span data-edge="haut" />
        <span data-edge="bas" />
        <span data-edge="gauche" />
        <span data-edge="droite" />
      </div>

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          <p className={styles.registre}>Entrée 001 — Registre du Système</p>

          <h1 id="personnage-title" className={styles.title}>
            {personnage.nom}
          </h1>

          <p className={styles.role}>{personnage.role ?? 'Entité'}</p>
        </header>

        <p className={styles.summary}>{personnage.resumeCourt}</p>

        {identityItems.length > 0 ? (
            <section className={styles.registreBloc} aria-labelledby="personnage-identity-title"
            data-reveal>
            <h2 id="personnage-identity-title" className={styles.sectionTitle}>
              <span className={styles.sectionIndex}>02</span> Registre
            </h2>
            <dl className={styles.entries}>
              {identityItems.map((item, index) => (
                <div className={styles.entry} key={item.key}>
                  <dt>
                    <span className={styles.entryIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {magicItems.length > 0 ? (
            <section className={styles.registreBloc} aria-labelledby="personnage-magic-title"
            data-reveal>
            <h2 id="personnage-magic-title" className={styles.sectionTitle}>
              <span className={styles.sectionIndex}>03</span> Capacités allouées
            </h2>
            <dl className={styles.entries}>
              {magicItems.map((item, index) => (
                <div className={styles.entry} key={item.key}>
                  <dt>
                    <span className={styles.entryIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </dt>
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
          <section className={styles.registreBloc} aria-label="Archive">
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIndex}>04</span> Archive
            </h2>
            <div className={styles.narrative}>{narrative}</div>
          </section>
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
