import Link from 'next/link';
import { PersonnageAtmosphere } from '@/components/personnages/effects/PersonnageAtmosphere';
import { getIdentityDetails, getMagicDetails } from '@/components/personnages/compositions/content';
import type { PersonnageCompositionProps } from '@/components/personnages/compositions/types';
import { PersonnageParticles } from '@/components/personnages/effects/PersonnageParticles';
import { getPersonnageSignature } from '@/components/personnages/signatures';
import styles from './StandardImmersivePersonnage.module.css';

export function StandardImmersivePersonnage({
  atmosphere,
  backHref = '/personnages',
  backLabel = 'Retour aux personnages',
  narrative,
  personnage,
  previewStatus,
}: PersonnageCompositionProps) {
  const identityItems = getIdentityDetails(personnage);
  const magicItems = getMagicDetails(personnage);

  const signature = getPersonnageSignature(personnage.slug);
  const SignatureTitle = signature?.Title;
  const SignatureOverlay = signature?.Overlay;

  return (
    <section className={styles.scene} aria-labelledby="personnage-title">
      <PersonnageAtmosphere atmosphere={atmosphere} />
      <PersonnageParticles atmosphere={atmosphere} />
      {SignatureOverlay ? <SignatureOverlay /> : null}

      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glowOne} />
        <span className={styles.glowTwo} />
        <span className={styles.horizon} />
      </div>

      <div className={styles.content}>
        <header className={styles.intro}>
          <div className={styles.introMeta}>
            <p className={styles.role}>{personnage.role ?? 'Personnage'}</p>
            {previewStatus ? (
              <span className={styles.previewPill} data-status={previewStatus}>
                Preview {previewStatus}
              </span>
            ) : null}
          </div>
          <h1 id="personnage-title" className={styles.title}>
            {SignatureTitle ? <SignatureTitle>{personnage.nom}</SignatureTitle> : personnage.nom}
          </h1>
        </header>

        <div className={styles.summaryBlock}>
          <p className={styles.blockLabel}>Introduction</p>
          <p className={styles.summary}>{personnage.resumeCourt}</p>

          {personnage.tags && personnage.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="Tags du personnage">
              {personnage.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}

          <Link className={styles.backLink} href={backHref}>
            {backLabel}
          </Link>
        </div>

        {identityItems.length > 0 ? (
          <section className={styles.identity} aria-labelledby="personnage-identity-title">
            <div className={styles.sectionHeader}>
              <h2 id="personnage-identity-title" className={styles.identityTitle}>
                Identité
              </h2>
              <p>Repères structurés de la fiche.</p>
            </div>
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
          <section className={styles.magic} aria-labelledby="personnage-magic-title">
            <div className={styles.sectionHeader}>
              <h2 id="personnage-magic-title" className={styles.magicTitle}>
                Magie
              </h2>
              <p>Concepts, manifestations et limites déjà structurés.</p>
            </div>
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

        <div className={styles.futureSpace} aria-hidden="true" />
      </div>
    </section>
  );
}
