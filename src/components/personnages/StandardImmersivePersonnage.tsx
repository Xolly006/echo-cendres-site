import Link from 'next/link';
import type { ReactNode } from 'react';
import { PersonnageAtmosphere } from '@/components/personnages/effects/PersonnageAtmosphere';
import { PersonnageParticles } from '@/components/personnages/effects/PersonnageParticles';
import type { PersonnageTheme } from '@/types/personnage-theme';
import type { Personnage } from '@/types/personnage';
import styles from './StandardImmersivePersonnage.module.css';

type StandardImmersivePersonnageProps = {
  personnage: Personnage;
  atmosphere?: PersonnageTheme['atmosphere'];
  narrative?: ReactNode;
};

type MagicItem = {
  label: string;
  value?: string;
  values?: string[];
};

const identityLabels = {
  aliases: 'Alias',
  nature: 'Nature',
  origin: 'Origine',
  status: 'Statut',
  era: 'Époque',
};

const magicLabels = {
  concept: 'Concept',
  domain: 'Domaine',
  artifact: 'Artefact',
  anchor: 'Ancre',
  abilities: 'Capacités',
  limits: 'Limites',
};

export function StandardImmersivePersonnage({ atmosphere, personnage, narrative }: StandardImmersivePersonnageProps) {
  const identityItems = personnage.identity
    ? [
        personnage.identity.aliases && personnage.identity.aliases.length > 0
          ? { label: identityLabels.aliases, value: personnage.identity.aliases.join(', ') }
          : null,
        personnage.identity.nature ? { label: identityLabels.nature, value: personnage.identity.nature } : null,
        personnage.identity.origin ? { label: identityLabels.origin, value: personnage.identity.origin } : null,
        personnage.identity.status ? { label: identityLabels.status, value: personnage.identity.status } : null,
        personnage.identity.era ? { label: identityLabels.era, value: personnage.identity.era } : null,
      ].filter((item): item is { label: string; value: string } => item !== null)
    : [];

  const magicCandidates: Array<MagicItem | null> = personnage.magic
    ? [
        personnage.magic.concept ? { label: magicLabels.concept, value: personnage.magic.concept } : null,
        personnage.magic.domain ? { label: magicLabels.domain, value: personnage.magic.domain } : null,
        personnage.magic.artifact ? { label: magicLabels.artifact, value: personnage.magic.artifact } : null,
        personnage.magic.anchor ? { label: magicLabels.anchor, value: personnage.magic.anchor } : null,
        personnage.magic.abilities && personnage.magic.abilities.length > 0
          ? { label: magicLabels.abilities, values: personnage.magic.abilities }
          : null,
        personnage.magic.limits && personnage.magic.limits.length > 0
          ? { label: magicLabels.limits, values: personnage.magic.limits }
          : null,
      ]
    : [];
  const magicItems = magicCandidates.filter((item): item is MagicItem => item !== null);

  return (
    <section className={styles.scene} aria-labelledby="personnage-title">
      <PersonnageAtmosphere atmosphere={atmosphere} />
      <PersonnageParticles atmosphere={atmosphere} />

      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glowOne} />
        <span className={styles.glowTwo} />
        <span className={styles.horizon} />
      </div>

      <div className={styles.content}>
        <header className={styles.intro}>
          <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
          <h1 id="personnage-title" className={styles.title}>
            {personnage.nom}
          </h1>
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

          <Link className={styles.backLink} href="/personnages">
            Retour aux personnages
          </Link>
        </div>

        {identityItems.length > 0 ? (
          <section className={styles.identity} aria-labelledby="personnage-identity-title">
            <h2 id="personnage-identity-title" className={styles.identityTitle}>
              Identité
            </h2>
            <dl className={styles.identityList}>
              {identityItems.map((item) => (
                <div className={styles.identityItem} key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {magicItems.length > 0 ? (
          <section className={styles.magic} aria-labelledby="personnage-magic-title">
            <h2 id="personnage-magic-title" className={styles.magicTitle}>
              Magie
            </h2>
            <dl className={styles.magicList}>
              {magicItems.map((item) => (
                <div className={styles.magicItem} key={item.label}>
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

        <div className={styles.futureSpace} aria-hidden="true" />
      </div>
    </section>
  );
}
