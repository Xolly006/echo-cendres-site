import Link from 'next/link';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import { PersonnageFond } from '@/components/personnages/effects/PersonnageFond';
import { RevealAuDefilement } from '@/components/personnages/effects/RevealAuDefilement';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { NomDouble } from './NomDouble';
import { ValeurIllusoire } from './ValeurIllusoire';
import { Craquelure } from './Craquelure';
import styles from './TheatrePersonnage.module.css';

/**
 * Composition "théâtre" — Le Théâtre des Cauchemars.
 *
 * Le verbe de Soryn : LA PAGE TE MENT — ET ELLE NE S'EN EXCUSE PAS.
 *
 * Distinction nette avec Kael : lui retire sans laisser de trace, on ne
 * sait même pas qu'il manque quelque chose. Elle SUBSTITUE, et elle veut
 * qu'on la croie. Un mensonge veut être cru.
 *
 * La ligne qui commande toute la page : "une héritière de l'Arquet SANS
 * TRAGÉDIE FONDATRICE". Kael a été enfermé vingt ans, Varros a perdu sa
 * famille, Elias a vu mourir sa soeur. Soryn s'ennuyait. Peintre de génie
 * lassée du réel, entrée dans l'Arquet par dégoût. Sa page ne doit donc
 * RIEN expliquer — et c'est précisément son horreur.
 *
 * D'où :
 *  - un proscenium : deux rideaux encadrent le viewport en permanence.
 *    C'est la seule page du site qui place le lecteur DEVANT au lieu de
 *    DEDANS. Il est dans la salle, le contenu est sur scène ;
 *  - un nom double, mal calé comme une impression ratée : au survol, les
 *    deux se séparent et l'on découvre qu'on n'a jamais lu un seul nom ;
 *  - des valeurs qui changent de formulation quand on ne les regarde pas
 *    — "le doute comme arme", canon ;
 *  - la craquelure : la page elle-même est un masque, et il se fend ;
 *  - le sceau : Thalie et Melpomène, qui s'échangent lentement. Et c'est
 *    le masque SOURIANT qui est fendu — le sourire est le mensonge, c'est
 *    toujours lui qui lâche en premier.
 *
 * Elle est peintre de génie : sa page doit être BELLE. C'est exactement
 * ce qui met mal à l'aise.
 */

function MasquesDuTheatre() {
  const visage = (
    id: string,
    x: number,
    sourit: boolean,
    fendu: boolean,
  ) => (
    <g key={id} transform={`translate(${x} 200)`}>
      {/* L'ovale du masque : porcelaine, sans épaisseur. */}
      <path
        d="M 0 -96 C 52 -96 74 -58 74 -8 C 74 54 40 100 0 100 C -40 100 -74 54 -74 -8 C -74 -58 -52 -96 0 -96 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
      />

      {/* Les yeux : deux vides en amande. */}
      <path
        d="M -46 -22 C -36 -38 -16 -38 -8 -22 C -16 -10 -36 -10 -46 -22 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M 8 -22 C 16 -38 36 -38 46 -22 C 36 -10 16 -10 8 -22 Z"
        fill="currentColor"
        opacity="0.55"
      />

      {/* La bouche : c'est elle qui dit lequel des deux on regarde. */}
      <path
        d={
          sourit
            ? 'M -38 34 C -18 62 18 62 38 34'
            : 'M -38 56 C -18 28 18 28 38 56'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Les larmes de Melpomène. */}
      {!sourit ? (
        <g opacity="0.6">
          <path d="M -27 -6 L -27 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 27 -6 L 27 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ) : null}

      {/* La fêlure : elle traverse le masque qui sourit. */}
      {fendu ? (
        <path
          d="M 14 -96 L 4 -50 L 22 -28 L 6 6 L 20 40 L 2 72 L 10 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      ) : null}
    </g>
  );

  return (
    <svg className={styles.sceau} viewBox="0 0 520 400" aria-hidden="true" focusable="false">
      {/*
        Les deux masques s'échangent très lentement, sur une minute. On ne
        peut pas attraper le moment où ça bascule : on sait juste que ce
        n'était pas dans ce sens tout à l'heure.
      */}
      <g className={styles.masqueGauche}>{visage('gauche', 140, true, true)}</g>
      <g className={styles.masqueDroit}>{visage('droit', 380, false, false)}</g>
    </svg>
  );
}

export function TheatrePersonnage({
  backHref = '/personnages',
  backLabel = 'Retour aux personnages',
  narrative,
  personnage,
  previewStatus,
}: PersonnageCompositionProps) {
  const identityItems = getIdentityDetails(personnage);
  const magicItems = getMagicDetails(personnage);
  const illusions = personnage.illusions ?? {};

  return (
    <section className={styles.scene} aria-labelledby="personnage-title">
      <RevealAuDefilement />

      <PersonnageFond
        fond={personnage.images?.fond}
        fondSecondaire={personnage.images?.fondSecondaire}
        intensite={0.7}
      />

      <MasquesDuTheatre />
      <Craquelure />

      {/* Le proscenium : le lecteur est dans la salle, pas sur scène. */}
      <div className={styles.proscenium} aria-hidden="true">
        <span data-rideau="gauche" />
        <span data-rideau="droit" />
        <span data-rideau="frise" />
      </div>

      <div className={styles.content} data-personnage-content>
        <header className={styles.intro}>
          {previewStatus ? (
            <span className={styles.previewPill}>Preview {previewStatus}</span>
          ) : null}

          <h1 id="personnage-title" className={styles.title}>
            <NomDouble nom={personnage.nom} double={personnage.identity?.aliases?.[0]} />
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
          <section className={styles.bloc} aria-labelledby="personnage-identity-title" data-reveal>
            <h2 id="personnage-identity-title" className={styles.sectionTitle}>
              Identité
            </h2>
            <dl className={styles.identityList}>
              {identityItems.map((item) => (
                <div className={styles.identityItem} key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>
                    <ValeurIllusoire valeur={item.value ?? ''} variantes={illusions[item.key]} />
                  </dd>
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
                    {item.value ? (
                      <p>
                        <ValeurIllusoire valeur={item.value} variantes={illusions[item.key]} />
                      </p>
                    ) : null}
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
