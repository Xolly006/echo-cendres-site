'use client';

import { useCallback, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RetableSeuil } from './RetableSeuil';
import { RoueDeFeu } from '../cage/RoueDeFeu';
import { Colonnes } from '../cage/Colonnes';
import styles from './RetablePersonnage.module.css';
import cageStyles from '../cage/CagePersonnage.module.css';

/**
 * L'orchestrateur de la possession — le modèle VOLUME.
 *
 * La synchronisation n'est plus un interrupteur : c'est un curseur continu
 * de 0 à 100, et L'ÉTAT DE LA PAGE EST LA VALEUR. La valeur reste là où le
 * lecteur la lâche. On peut monter, redescendre, s'arrêter entre deux.
 *
 * Répartition des territoires :
 *
 *   0 – 35    ELIAS PUR. Son noir, sa bougie, son sceau. À 0, aucune trace
 *             de l'ange : sa page telle qu'il la tient.
 *   35 – 55   PRÉSENCE. La Roue se devine derrière le noir, une colonne
 *             passe parfois. Rien ne lutte encore : quelque chose regarde.
 *   55 – 85   LA LUTTE. Le nom glitche, deux lumières se disputent la
 *             page, le coeur s'accélère.
 *   85 – 100  LA CAGE. Le cadre se referme, le fond bascule vers l'ivoire —
 *             légitime ici : on ne recolore pas la page d'Elias, on change
 *             de territoire.
 *   100       LA page de Métatron. La vraie : son registre, son récit, sa
 *             roue pleine. Pas une recoloration.
 *
 * Framer Motion (AnimatePresence) gère l'entrée et la sortie des mondes en
 * fondu, proprement, au lieu d'un château de calc() et d'opacités.
 */

type Possession = {
  entity: string;
  entitySlug?: string;
  sync: number;
  verdicts?: Record<string, string>;
};

type RetableSceneProps = {
  children: ReactNode;
  possession?: Possession;
  /** La page complète de l'entité, rendue à 100 %. */
  entityPage?: ReactNode;
};

const EASE = [0.4, 0, 0.2, 1] as const;

export function RetableScene({ children, possession, entityPage }: RetableSceneProps) {
  const [sync, setSync] = useState(possession?.sync ?? 50);

  const handleSyncChange = useCallback((value: number) => setSync(value), []);

  if (!possession) {
    return <>{children}</>;
  }

  const p = sync / 100;
  const presence = sync >= 35;
  const lutte = sync >= 55;
  const cage = sync >= 85;
  const entite = sync >= 100;

  const state = entite ? 'entite' : cage ? 'cage' : lutte ? 'lutte' : presence ? 'presence' : 'hote';

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
          '--sync-progress': p.toFixed(3),
          '--lutte-progress': Math.min(1, Math.max(0, (sync - 55) / 30)).toFixed(3),
          '--cage-progress': Math.min(1, Math.max(0, (sync - 85) / 15)).toFixed(3),
          '--heartbeat': `${(1.2 - Math.min(1, Math.max(0, (sync - 55) / 45)) * 0.6).toFixed(2)}s`,
          ...verdictVars,
        } as CSSProperties
      }
    >
      <AnimatePresence>
        {!entite ? (
          <motion.div
            key="hote"
            initial={false}
            exit={{ opacity: 0, y: -14, transition: { duration: 1.5, ease: EASE } }}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {presence && !entite ? (
          <motion.div
            key="presence"
            className={styles.entiteMonde}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.16 + p * 0.84, transition: { duration: 2.2, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 1.6, ease: EASE } }}
            aria-hidden="true"
          >
            <RoueDeFeu />
            {lutte ? <Colonnes /> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cage && !entite ? (
          <motion.div
            key="cage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 1, ease: EASE } }}
            aria-hidden="true"
          >
            <div className={styles.aube} />
            {/* L'avant-goût : le registre de l'entité se devine déjà à
                travers la page de l'hôte, avant la bascule complète. */}
            {entityPage ? (
              <div className={styles.entiteApercu} aria-hidden="true">
                {entityPage}
              </div>
            ) : null}
            <div className={cageStyles.cadre}>
              <span data-edge="haut" />
              <span data-edge="bas" />
              <span data-edge="gauche" />
              <span data-edge="droite" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {entite && entityPage ? (
          <motion.div
            key="entite"
            className={styles.entitePage}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 2.2, ease: EASE } }}
            exit={{ opacity: 0, scale: 1.01, transition: { duration: 1.3, ease: EASE } }}
          >
            {entityPage}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={styles.seuilMount}>
        <RetableSeuil value={sync} restingPoint={possession.sync} onSyncChange={handleSyncChange} />
      </div>
    </div>
  );
}
