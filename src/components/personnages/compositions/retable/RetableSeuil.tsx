'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RetablePersonnage.module.css';

/**
 * Le Seuil de synchronisation.
 *
 * Canon : "Elias se limite volontairement à 50% de synchronisation. Si
 * Elias lâchait prise (Synergie 100%), Métatron prendrait le contrôle
 * total." Et : "Il doit méditer 10 heures par jour juste pour empêcher
 * Métatron de prendre le contrôle."
 *
 * Le seuil n'est pas un indicateur : c'est un effort. Le lecteur est celui
 * qui le fait lâcher.
 *
 * Un clic bascule. La montée dure environ deux secondes, la descente un
 * peu plus : reprendre le contrôle coûte plus cher que le perdre.
 *
 * Une fois arrivé à 100, le nombre cesse de varier — c'est ainsi qu'Elias
 * disparaît : pas en s'effaçant, en cessant de varier.
 *
 * Sous prefers-reduced-motion, la bascule est immédiate.
 */

const CEILING = 100;
const RISE_MS = 2000;
const FALL_MS = 3200;

type SeuilProps = {
  /** Synergie tenue par l'hôte. 50 pour Elias, 80 pour Solomon, 100 pour Célestine. */
  floor: number;
  onSyncChange: (value: number) => void;
};

export function RetableSeuil({ floor, onSyncChange }: SeuilProps) {
  const FLOOR = floor;
  const [sync, setSync] = useState(floor);
  const [busy, setBusy] = useState(false);

  const frameRef = useRef(0);
  const syncRef = useRef(floor);
  const onChangeRef = useRef(onSyncChange);

  useEffect(() => {
    onChangeRef.current = onSyncChange;
  }, [onSyncChange]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const animateTo = useCallback((target: number) => {
    cancelAnimationFrame(frameRef.current);

    const from = syncRef.current;
    const distance = target - from;
    if (distance === 0) return;

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      syncRef.current = target;
      setSync(target);
      onChangeRef.current(target);
      return;
    }

    const duration = distance > 0 ? RISE_MS : FALL_MS;
    const started = performance.now();
    setBusy(true);

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      // Départ lent, fin nette : la correction s'impose, elle ne s'excuse pas.
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const value = from + distance * eased;

      syncRef.current = value;
      setSync(value);
      onChangeRef.current(value);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      frameRef.current = 0;
      syncRef.current = target;
      setSync(target);
      onChangeRef.current(target);
      setBusy(false);
    };

    frameRef.current = requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(() => {
    animateTo(syncRef.current >= (FLOOR + CEILING) / 2 ? FLOOR : CEILING);
  }, [animateTo]);

  const locked = sync >= CEILING;
  const rounded = Math.round(sync);
  const progress = ((sync - FLOOR) / (CEILING - FLOOR)) * 100;

  return (
    <div className={styles.seuil}>
      <p className={styles.seuilLabel}>Synchronisation</p>

      <button
        type="button"
        className={styles.seuilControl}
        aria-pressed={locked}
        aria-label={
          locked
            ? 'Synchronisation à cent pour cent. Activer pour reprendre le contrôle.'
            : 'Synchronisation maintenue à cinquante pour cent. Activer pour lâcher prise.'
        }
        data-busy={busy ? '' : undefined}
        data-locked={locked ? '' : undefined}
        onClick={toggle}
      >
        <span className={styles.seuilValue}>
          <span className={styles.seuilDigits} aria-hidden="true">
            {rounded}
          </span>
          <span className={styles.seuilUnit} aria-hidden="true">
            %
          </span>
        </span>

        <span className={styles.seuilTrace} aria-hidden="true">
          <span className={styles.seuilFill} style={{ width: `${progress}%` }} />
        </span>

        <span className={styles.seuilHint} aria-hidden="true">
          {locked ? 'Reprendre le contrôle' : 'Lâcher prise'}
        </span>
      </button>

      <p className={styles.srOnly} role="status" aria-live="polite">
        {locked ? 'Métatron a pris le contrôle.' : `Synchronisation à ${rounded} pour cent.`}
      </p>
    </div>
  );
}
