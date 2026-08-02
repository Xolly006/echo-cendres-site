'use client';

import { useEffect, useRef, useState } from 'react';
import type { FactionMembre } from '@/types/faction';
import styles from './FilFaction.module.css';

type FilsProps = {
  sieges: FactionMembre[];
};

type FilPath = {
  nom: string;
  d: string;
};

/**
 * Les fils SVG qui descendent de Veyran vers chaque siège en poste
 * (docs/ARQUET_COMPOSITION.md §1). Un fil par membre — le nombre dérive
 * de `sieges.length`, jamais écrit en dur.
 *
 * Couche purement décorative, aria-hidden, mesurée côté client : la
 * structure (§3) reste lisible sans elle si JS est indisponible.
 *
 * Étape 4 : état initial seulement — géométrie de convergence sur Veyran,
 * statique. La prolongation vers Astraevor existe déjà dans le SVG
 * (rendu serveur-compatible dès que le JS mesure) mais reste à opacité 0 :
 * sa révélation est l'étape 6, pas celle-ci.
 */
export function Fils({ sieges }: FilsProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<FilPath[]>([]);
  const [prolongation, setProlongation] = useState<string | null>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (sieges.length === 0) return;

    const svg = svgRef.current;
    if (!svg) return;

    const scene = svg.closest<HTMLElement>('section[aria-labelledby="faction-title"]');
    if (!scene) return;

    const measure = () => {
      const veyranEl = scene.querySelector<HTMLElement>('[data-veyran-name]');
      if (!veyranEl) return;

      const sceneRect = scene.getBoundingClientRect();
      const veyranRect = veyranEl.getBoundingClientRect();
      const originX = veyranRect.left + veyranRect.width / 2 - sceneRect.left;
      const originY = veyranRect.bottom - sceneRect.top;

      const nextPaths: FilPath[] = [];
      scene.querySelectorAll<HTMLElement>('[data-siege-nom]').forEach((el) => {
        const nom = el.dataset.siegeNom;
        if (!nom) return;

        const rect = el.getBoundingClientRect();
        const endX = rect.left + rect.width / 2 - sceneRect.left;
        const endY = rect.top - sceneRect.top;
        const controlX = (originX + endX) / 2;
        const controlY = (originY + endY) / 2;

        nextPaths.push({ nom, d: `M ${originX} ${originY} Q ${controlX} ${controlY} ${endX} ${endY}` });
      });

      setPaths(nextPaths);
      setBox({ width: sceneRect.width, height: sceneRect.height });

      const astraevorEl = scene.querySelector<HTMLElement>('[data-astraevor-name]');
      if (astraevorEl) {
        const astraevorRect = astraevorEl.getBoundingClientRect();
        const endX = astraevorRect.left + astraevorRect.width / 2 - sceneRect.left;
        const endY = astraevorRect.bottom - sceneRect.top;
        const topOriginY = veyranRect.top - sceneRect.top;
        const controlX = (originX + endX) / 2;
        const controlY = (topOriginY + endY) / 2;
        setProlongation(`M ${originX} ${topOriginY} Q ${controlX} ${controlY} ${endX} ${endY}`);
      }
    };

    measure();

    let resizeTimeout = 0;
    const scheduleMeasure = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(measure, 180);
    };

    window.addEventListener('resize', scheduleMeasure);

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [sieges]);

  if (sieges.length === 0) return null;

  // Tant que la mesure réelle n'a pas eu lieu, ne rien tracer plutôt que
  // de dessiner dans un viewBox de repli non représentatif — un tracé
  // mal proportionné vaut mieux absent que faux.
  const isMeasured = box.width > 0 && box.height > 0;

  return (
    <svg
      ref={svgRef}
      className={styles.fils}
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${box.width || 1} ${box.height || 1}`}
      preserveAspectRatio="none"
    >
      <g className={styles.filsConvergence}>
        {isMeasured ? paths.map((path) => <path key={path.nom} d={path.d} />) : null}
      </g>
      {isMeasured && prolongation ? (
        <g className={styles.filsProlongation}>
          <path d={prolongation} />
        </g>
      ) : null}
    </svg>
  );
}
