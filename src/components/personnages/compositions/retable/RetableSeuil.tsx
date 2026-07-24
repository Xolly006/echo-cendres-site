'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RetablePersonnage.module.css';

/**
 * Le Seuil — un VOLUME, pas un interrupteur.
 *
 * Un anneau que l'on tourne : cliquer ou glisser n'importe où sur l'anneau
 * règle la synchronisation entre 0 et 100. LA VALEUR RESTE LÀ OÙ ON LA
 * LÂCHE — pas de rappel, pas de verrouillage, pas de retour élastique.
 * On peut monter, redescendre, s'arrêter à 63.
 *
 * Le point de repos canonique de l'hôte (50 pour Elias) est marqué d'un
 * cran sur l'anneau : c'est là que la page se charge, et le lecteur voit
 * toujours où l'hôte, lui, se tient.
 *
 * Accessibilité : c'est un vrai slider — role="slider", flèches clavier
 * (±2, ±10 avec PageUp/PageDown), Home/End, annonce polie de la valeur.
 */

const CIRCUMFERENCE = 270.2; // 2πr, r=43

type SeuilProps = {
  value: number;
  /** Synergie tenue par l'hôte au repos — le cran sur l'anneau. */
  restingPoint: number;
  onSyncChange: (value: number) => void;
};

export function RetableSeuil({ value, restingPoint, onSyncChange }: SeuilProps) {
  const [dragging, setDragging] = useState(false);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  const ringRef = useRef<SVGSVGElement | null>(null);

  const setFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const svg = ringRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Angle depuis le haut de l'anneau, sens horaire, 0..1
      const angle = Math.atan2(clientX - cx, cy - clientY);
      const turn = (angle + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
      let next = Math.round(turn * 100);

      // Sur un cadran circulaire, 100 et 0 se touchent : un pixel de trop
      // en haut et on retombe brutalement de 100 à 0. Trois protections :
      // - zone magnétique : au-delà de 97 on colle à 100, sous 3 on colle à 0 ;
      // - pas de saut de plus de 50 en un seul mouvement (anti-wraparound).
      if (next >= 97) next = 100;
      if (next <= 3 && valueRef.current > 50) next = 100;
      else if (next <= 3) next = 0;
      if (Math.abs(next - valueRef.current) > 50 && next < valueRef.current) {
        next = valueRef.current >= 97 ? 100 : next;
      }

      valueRef.current = next;
      onSyncChange(next);
    },
    [onSyncChange],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => setFromPointer(event.clientX, event.clientY);
    const onUp = () => setDragging(false);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragging, setFromPointer]);

  const rounded = Math.round(value);
  const digits = String(rounded).split('');
  const progress = value / 100;

  return (
    <div className={styles.seuil}>
      <p className={styles.seuilLabel}>Synchronisation</p>

      <div
        className={styles.seuilControl}
        role="slider"
        tabIndex={0}
        aria-label="Synchronisation avec l'entité"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded} pour cent`}
        data-dragging={dragging ? '' : undefined}
        data-locked={rounded >= 100 ? '' : undefined}
        onPointerDown={(event) => {
          event.preventDefault();
          setDragging(true);
          setFromPointer(event.clientX, event.clientY);
        }}
        onKeyDown={(event) => {
          const step =
            event.key === 'ArrowUp' || event.key === 'ArrowRight' ? 2
            : event.key === 'ArrowDown' || event.key === 'ArrowLeft' ? -2
            : event.key === 'PageUp' ? 10
            : event.key === 'PageDown' ? -10
            : null;

          if (step !== null) {
            event.preventDefault();
            onSyncChange(Math.min(100, Math.max(0, rounded + step)));
          } else if (event.key === 'Home') {
            event.preventDefault();
            onSyncChange(0);
          } else if (event.key === 'End') {
            event.preventDefault();
            onSyncChange(100);
          }
        }}
      >
        <span className={styles.seuilAnneau} aria-hidden="true">
          <svg ref={ringRef} viewBox="0 0 100 100" focusable="false">
            <circle className={styles.seuilPiste} cx="50" cy="50" r="43" />
            <circle
              className={styles.seuilArc}
              cx="50"
              cy="50"
              r="43"
              style={{ strokeDashoffset: CIRCUMFERENCE - CIRCUMFERENCE * progress }}
            />
            {/* Le cran : la position de repos de l'hôte. */}
            <line
              className={styles.seuilCran}
              x1="50"
              y1="3"
              x2="50"
              y2="10"
              transform={`rotate(${restingPoint * 3.6} 50 50)`}
            />
            {/* La poignée. */}
            <circle
              className={styles.seuilPoignee}
              cx="50"
              cy="7"
              r="3"
              transform={`rotate(${value * 3.6} 50 50)`}
            />
          </svg>

          <span className={styles.seuilValue}>
            {digits.map((digit, index) => (
              <span
                key={`${index}-${digit}`}
                className={styles.seuilDigit}
                data-owner={index / digits.length < progress ? 'entite' : 'hote'}
              >
                {digit}
              </span>
            ))}
            <span className={styles.seuilUnit}>%</span>
          </span>
        </span>
      </div>

      <p className={styles.srOnly} role="status" aria-live="polite">
        Synchronisation à {rounded} pour cent.
      </p>
    </div>
  );
}
