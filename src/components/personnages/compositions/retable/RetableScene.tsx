'use client';

import { useCallback, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { RetableSeuil } from './RetableSeuil';
import styles from './RetablePersonnage.module.css';

/**
 * Enveloppe cliente de la composition "retable".
 *
 * Elle porte l'état de synchronisation et le traduit en attributs sur la
 * scène. Aucun contenu n'est monté ni démonté : la lutte se joue
 * intégralement en couches superposées.
 *
 * LA CONTAMINATION
 *
 * L'erreur serait d'interpoler les couleurs de l'un vers l'autre : on
 * obtiendrait une bouillie tiède, et une lutte ne se mélange pas. Ici, une
 * couche ivoire en `mix-blend-mode: difference` est posée sur toute la
 * page, révélée par un masque irrégulier qui progresse avec la synergie.
 *
 * Conséquence : là où le masque est ouvert, le fond sombre devient ivoire
 * et le texte clair devient noir — la page de Métatron, au pixel près, sans
 * dupliquer une seule ligne de contenu. Et comme le masque ne suit aucune
 * limite de bloc, un même mot peut être coupé en deux : moitié Elias,
 * moitié Métatron, fracture au milieu de la lettre.
 *
 * LE RYTHME CARDIAQUE
 *
 * "Tu hésites, Utilisateur Elias. Ton rythme cardiaque augmente. C'est
 * inefficace." Entre 50 et 100, une pulsation entre dans le tempo de la
 * page et accélère. À 100 elle s'arrête net — un cœur qu'on éteint.
 */

type RetableSceneProps = {
  children: ReactNode;
  possession?: {
    entity: string;
    entitySlug?: string;
    sync: number;
    verdicts?: Record<string, string>;
  };
};

export function RetableScene({ children, possession }: RetableSceneProps) {
  const floor = possession?.sync ?? 50;
  const [sync, setSync] = useState(floor);

  const handleSyncChange = useCallback((value: number) => setSync(value), []);

  if (!possession) {
    return <>{children}</>;
  }

  const progress = Math.min(1, Math.max(0, (sync - floor) / (100 - floor || 1)));
  const state = sync >= 100 ? 'entite' : sync > floor ? 'lutte' : 'hote';

  const verdictVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(possession.verdicts ?? {})) {
    verdictVars[`--verdict-${key}`] = `"${value.replace(/"/g, '\\"')}"`;
  }

  return (
    <div
      className={styles.sceneState}
      data-sync={state}
      style={
        {
          '--sync-progress': progress.toFixed(3),
          // Le coeur accélère à mesure que l'hôte perd prise.
          '--heartbeat': `${(1.15 - progress * 0.55).toFixed(2)}s`,
          ...verdictVars,
        } as CSSProperties
      }
    >
      {children}

      {/* La contamination : une seule couche, aucun contenu dupliqué. */}
      <div className={styles.contamination} aria-hidden="true" />

      {/* La Cage Dorée : architecture parfaite de lumière, qui se trace
          puis tourne, linear, pour toujours. */}
      <div className={styles.cage} aria-hidden="true">
        <span className={styles.cageAnneau} data-ring="1" />
        <span className={styles.cageAnneau} data-ring="2" />
        <span className={styles.cageAnneau} data-ring="3" />
      </div>

      <div className={styles.seuilMount}>
        <RetableSeuil floor={floor} onSyncChange={handleSyncChange} />
        {possession.entitySlug ? (
          <Link className={styles.entityLink} href={`/personnages/preview/${possession.entitySlug}`}>
            {possession.entity}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
