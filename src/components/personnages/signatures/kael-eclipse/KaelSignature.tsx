import type { ReactNode } from 'react';
import type { PersonnageSignature } from '../types';
import { KaelSignatureClient } from './KaelSignatureClient';
import styles from './KaelSignature.module.css';

/**
 * Signature visuelle de Kael l'Éclipsé — v1.
 *
 * Intention (docs/SIGNATURES_VISUELLES_PERSONNAGES.md) :
 * la page refuse de reconnaître sa présence. Le nom s'efface par endroits,
 * une fumée noire assombrit la scène, les labels de section sont rongés,
 * le cerveau du lecteur "oublie" ce qui est proche du curseur. Rien ne
 * clignote, rien ne crie : c'est une absence, pas un effet spécial.
 *
 * Ce fichier ne fait que du balisage + du CSS pur (letters, --letter-index,
 * --kael-scatter). Tout le travail DOM/canvas/pointeur vit dans
 * KaelSignatureClient.tsx ('use client'), monté via l'Overlay existant.
 * Le registre par slug ne change pas.
 */

function letterScatter(index: number): string {
  const direction = index % 2 === 0 ? -1 : 1;
  const magnitude = 4 + (index % 4) * 3;
  return `${direction * magnitude}px`;
}

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
        style={
          {
            '--letter-index': index,
            '--kael-scatter': letterScatter(index),
          } as React.CSSProperties
        }
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
    <>
      <div aria-hidden="true" className={styles.overlay}>
        <span className={styles.void} />
        <span className={styles.denial} />
        <KaelSignatureClient />
      </div>
      <div aria-hidden="true" className={styles.arrivalLayer}>
        <span className={styles.arrivalVeil} />
      </div>
    </>
  );
}

export const kaelEclipseSignature: PersonnageSignature = {
  slug: 'kael-eclipse',
  Title: KaelTitle,
  Overlay: KaelOverlay,
};
