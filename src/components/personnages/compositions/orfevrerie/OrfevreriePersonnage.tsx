import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { PersonnageFond } from '@/components/personnages/effects/PersonnageFond';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { Transmutation } from './Transmutation';
import { FluxArgent } from './FluxArgent';
import styles from './OrfevreriePersonnage.module.css';

/**
 * Composition "orfèvrerie".
 *
 * Le verbe d'Aurélia : LA PAGE SE LAISSE TOUCHER — ET C'EST ÇA QUI EST
 * TERRIBLE.
 *
 * Elle est la seule page du site qui répond au contact du lecteur. Kael le
 * refuse, Ysolde l'ignore, Métatron le corrige. Elle, elle accueille — et
 * ce qu'il touche se dore et cesse de vivre. Le lecteur devient complice.
 *
 * Ce que la composition tire du canon :
 *
 *  - LA CAGE DE VERRE. "Elle vivait dans une cage de verre, nourrie à la
 *    cuillère." Un cadre de fines lignes argentées entoure le viewport en
 *    permanence. Ce ne sont pas des barreaux : c'est du verre. On ne
 *    l'empêche pas de sortir, on l'empêche de toucher.
 *
 *  - L'ANCRE COMME RETENUE. "Astraevor lui a offert l'Ancre non pas pour
 *    la puissance, mais pour la RESTRICTION." Son sceau est un cercle
 *    d'équilibre mi-or mi-argent, et l'or de la page ne dépasse jamais ce
 *    cercle. La retenue est visible.
 *
 *  - L'HÉSITATION. Elle n'est pas hautaine : elle est incertaine, et
 *    dangereuse pour cette raison. La page apparaît avec des retards
 *    irréguliers, comme quelqu'un qui n'est pas sûr d'avoir le droit.
 *
 *  - LE LIEN DE SORTIE NE SE DORE JAMAIS. C'est la seule chose qu'elle
 *    n'ose pas prendre.
 *
 * Vitrine de joaillerie, volontairement : luxe glacé, très espacé, où
 * rien ne se touche. C'est une esthétique qui sert le personnage.
 */

function CercleDEquilibre() {
  /*
   * L'Ancre : un cercle partagé entre l'or et l'argent, marqué de
   * symboles. Ce n'est pas une couronne — c'est un frein. Les deux
   * métaux se tiennent en équilibre, et c'est cet équilibre qui lui
   * rend le droit de toucher.
   */
  const symboles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg className={styles.sceau} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="aurelia-equilibre" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="49%" stopColor="#c9a227" />
          <stop offset="51%" stopColor="#c8ccd0" />
          <stop offset="100%" stopColor="#c8ccd0" />
        </linearGradient>
      </defs>

      {/* L'anneau : or à gauche, argent à droite, la césure au centre. */}
      <circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="url(#aurelia-equilibre)"
        strokeWidth="3"
      />
      <circle
        cx="200"
        cy="200"
        r="138"
        fill="none"
        stroke="url(#aurelia-equilibre)"
        strokeWidth="0.9"
        opacity="0.5"
      />

      {/* La barre d'équilibre : elle sépare les deux métaux et les tient. */}
      <line x1="200" y1="38" x2="200" y2="362" stroke="url(#aurelia-equilibre)" strokeWidth="1.2" opacity="0.4" />

      {/* Les symboles gravés sur l'anneau. Angulaires, frappés au poinçon. */}
      <g stroke="url(#aurelia-equilibre)" strokeWidth="2" fill="none" strokeLinecap="square">
        {symboles.map((angle) => (
          <g key={angle} transform={`rotate(${angle} 200 200)`}>
            <path d="M 194 44 L 200 32 L 206 44 M 197 38 L 203 38" transform="translate(0 6)" />
          </g>
        ))}
      </g>

      {/* Le fléau de balance, au centre : l'équilibre lui-même. */}
      <g stroke="url(#aurelia-equilibre)" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <line x1="132" y1="200" x2="268" y2="200" />
        <path d="M 132 200 L 118 226 L 146 226 Z" />
        <path d="M 268 200 L 254 226 L 282 226 Z" />
        <line x1="200" y1="176" x2="200" y2="200" />
      </g>
    </svg>
  );
}

export function OrfevreriePersonnage({
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
        intensite={0.72}
      />

      <CercleDEquilibre />
      <FluxArgent />

      {/* La cage de verre : pas des barreaux, du verre. */}
      <div className={styles.cageDeVerre} aria-hidden="true">
        <span data-paroi="haut" />
        <span data-paroi="bas" />
        <span data-paroi="gauche" />
        <span data-paroi="droite" />
      </div>

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          <h1 id="personnage-title" className={styles.title} data-transmutable>
            {personnage.nom}
          </h1>

          <p className={styles.role} data-transmutable>
            {personnage.role ?? 'Personnage'}
          </p>
        </header>

        <div className={styles.bloc}>
          <p className={styles.summary} data-transmutable>
            {personnage.resumeCourt}
          </p>

          {personnage.tags && personnage.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="Tags du personnage">
              {personnage.tags.map((tag) => (
                <li key={tag} data-transmutable>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {identityItems.length > 0 ? (
          <section className={styles.bloc} aria-labelledby="personnage-identity-title" data-reveal>
            <h2 id="personnage-identity-title" className={styles.sectionTitle} data-transmutable>
              Identité
            </h2>
            <dl className={styles.identityList}>
              {identityItems.map((item) => (
                <div className={styles.identityItem} key={item.key}>
                  <dt data-transmutable>{item.label}</dt>
                  <dd data-transmutable>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {magicItems.length > 0 ? (
          <section className={styles.bloc} aria-labelledby="personnage-magic-title" data-reveal>
            <h2 id="personnage-magic-title" className={styles.sectionTitle} data-transmutable>
              Magie
            </h2>
            <dl className={styles.magicList}>
              {magicItems.map((item) => (
                <div className={styles.magicItem} key={item.key}>
                  <dt data-transmutable>{item.label}</dt>
                  <dd>
                    {item.value ? <p data-transmutable>{item.value}</p> : null}
                    {item.values ? (
                      <ul>
                        {item.values.map((value) => (
                          <li key={value} data-transmutable>
                            {value}
                          </li>
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

        {/* Le lien de sortie ne porte pas data-transmutable : c'est la
            seule chose qu'elle n'ose pas prendre. */}
        <div className={styles.exit}>
          <Link className={styles.backLink} href={backHref} data-personnage-exit>
            {backLabel}
          </Link>
        </div>
      </div>

      <Transmutation />
    </section>
  );
}
