import type { ReactNode } from 'react';
import type { PersonnageSignature } from '../types';
import styles from './KaelSignature.module.css';

/**
 * Signature visuelle de Kael l'Éclipsé — pilote du système de signatures.
 *
 * Intention (docs/SIGNATURES_VISUELLES_PERSONNAGES.md) :
 * la page refuse de reconnaître sa présence. Le nom s'efface par endroits,
 * lentement, puis revient. Rien ne clignote, rien ne crie : c'est une
 * absence, pas un effet spécial.
 *
 * Tout est en CSS pur (aucun JavaScript client) et respecte
 * prefers-reduced-motion : sans animation, le nom garde seulement une
 * légère perte de présence statique sur ses dernières lettres.
 */

function splitName(children: ReactNode): ReactNode {
  if (typeof children !== 'string') {
    return children;
  }

  const characters = Array.from(children);

  return characters.map((character, index) => {
    if (character === ' ') {
      return (
        <span key={`space-${index}`} className={styles.space} aria-hidden="true">
          {' '}
        </span>
      );
    }

    return (
      <span
        key={`letter-${index}`}
        aria-hidden="true"
        className={styles.letter}
        style={{ '--letter-index': index } as React.CSSProperties}
      >
        {character}
      </span>
    );
  });
}

function KaelTitle({ children }: { children: ReactNode }) {
  const accessibleName = typeof children === 'string' ? children : undefined;

  return (
    <span className={styles.name}>
      {accessibleName ? <span className={styles.srOnly}>{accessibleName}</span> : null}
      <span className={styles.letters} aria-hidden={accessibleName ? 'true' : undefined}>
        {splitName(children)}
      </span>
    </span>
  );
}

function KaelOverlay() {
  return (
    <div aria-hidden="true" className={styles.overlay}>
      <span className={styles.veil} />
      <span className={styles.denial} />
    </div>
  );
}

export const kaelEclipseSignature: PersonnageSignature = {
  slug: 'kael-eclipse',
  Title: KaelTitle,
  Overlay: KaelOverlay,
};
