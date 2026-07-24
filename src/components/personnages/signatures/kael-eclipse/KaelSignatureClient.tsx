'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './KaelSignature.module.css';

/**
 * Partie vivante de la signature Kael l'Éclipsé : arrivée "cachot",
 * effacement au pointeur, fumée globale, labels rongés, sortie dissoute.
 *
 * Toutes les cibles hors de ce module (titre, labels de section, lien de
 * retour, conteneur de contenu) sont repérées via des ancrages stables du
 * DOM (id, aria-labelledby, structure, "seul <a> du scene") — jamais via
 * les classes CSS modules d'un autre fichier. Les lettres qu'on crée
 * nous-mêmes (labels, sortie) utilisent nos propres classes CSS, importées
 * depuis le même module que KaelSignature.tsx donc garanties identiques.
 *
 * Un seul requestAnimationFrame (la boucle du canvas fumée) porte aussi
 * l'application des styles d'effacement au pointeur, pour respecter la
 * contrainte "un seul rAF".
 */

const POINTER_RADIUS = 110;
const BLOCK_POINTER_RADIUS = 190;

/*
 * Retrait du flux — la Non-existence.
 *
 * "Une invisibilité cache une chose qui demeure là." Un élément atténué
 * demeure : il garde sa place, et cette place se voit. Les éléments
 * marqués `data-personnage-withdrawable` se retirent au contraire du flux,
 * et la ligne se referme derrière eux.
 *
 * Trois précautions :
 *  - les rectangles sont mesurés une fois et jamais pendant un retrait,
 *    sinon le retrait déplace la cible et provoque une oscillation ;
 *  - hystérésis : on se retire à 130px, on ne revient qu'au-delà de 210px ;
 *  - délais asymétriques : disparition lente (un oubli), retour plus lent
 *    encore. Rien ne doit ressembler à un tic d'interface.
 */
const WITHDRAW_RADIUS = 130;
const RESTORE_RADIUS = 210;
const WITHDRAW_DELAY_MS = 320;
const RESTORE_DELAY_MS = 900;

type WithdrawableEntry = {
  el: HTMLElement;
  rect: { left: number; top: number; right: number; bottom: number };
  withdrawn: boolean;
  timer: number;
};
const ARRIVAL_VOID_MS = 1000;
const ARRIVAL_CONDENSE_MS = 1300;

type PointerTrackingState = {
  letters: Array<{ el: HTMLElement; x: number; y: number }>;
  /**
   * Blocs de contenu marqués `data-personnage-erasable` par la composition.
   * Contrairement aux lettres, ils sont mesurés par leur rectangle entier :
   * c'est la phrase qui cesse d'être admise, pas les caractères un par un.
   */
  blocks: Array<{ el: HTMLElement; rect: { left: number; top: number; right: number; bottom: number } }>;
  withdrawables: WithdrawableEntry[];
  pointer: { x: number; y: number } | null;
  active: Set<HTMLElement>;
};

type SmokeWisp = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftPhase: number;
  driftSpeed: number;
  opacityPhase: number;
  opacitySpeed: number;
  baseOpacity: number;
};

function wrapLetters(el: HTMLElement | null, letterClassName: string, rongeChance: number): HTMLElement[] {
  if (!el) return [];

  if (el.dataset.kaelWrapped === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>(`.${letterClassName}`));
  }

  const fullText = el.textContent ?? '';
  if (!fullText.trim()) return [];

  el.textContent = '';
  el.dataset.kaelWrapped = 'true';

  const srSpan = document.createElement('span');
  srSpan.className = styles.srOnly;
  srSpan.textContent = fullText;
  el.appendChild(srSpan);

  const lettersWrap = document.createElement('span');
  lettersWrap.setAttribute('aria-hidden', 'true');
  el.appendChild(lettersWrap);

  const letters: HTMLElement[] = [];

  Array.from(fullText).forEach((character) => {
    if (character === ' ') {
      const space = document.createElement('span');
      space.className = styles.space;
      space.textContent = ' ';
      lettersWrap.appendChild(space);
      return;
    }

    const letter = document.createElement('span');
    letter.className = letterClassName;
    letter.textContent = character;

    if (Math.random() < rongeChance) {
      const rot = 0.15 + Math.random() * 0.2;
      letter.style.setProperty('--kael-rot', rot.toFixed(2));
    }

    lettersWrap.appendChild(letter);
    letters.push(letter);
  });

  return letters;
}

function findContentWrapper(scene: HTMLElement): HTMLElement | null {
  // Ancrage explicite fourni par la composition (data-personnage-content).
  // Repli sur l'ancienne heuristique uniquement si l'attribut manque.
  const anchored = scene.querySelector<HTMLElement>('[data-personnage-content]');
  if (anchored) return anchored;

  for (const child of Array.from(scene.children)) {
    if (child instanceof HTMLElement && !child.hasAttribute('aria-hidden')) {
      return child;
    }
  }
  return null;
}

function runArrival(scene: HTMLElement): () => void {
  scene.setAttribute('data-kael-phase', 'void');

  const condenseTimer = window.setTimeout(() => {
    scene.setAttribute('data-kael-phase', 'condense');
  }, ARRIVAL_VOID_MS);

  const settleTimer = window.setTimeout(() => {
    scene.removeAttribute('data-kael-phase');
  }, ARRIVAL_VOID_MS + ARRIVAL_CONDENSE_MS);

  return () => {
    window.clearTimeout(condenseTimer);
    window.clearTimeout(settleTimer);
    scene.removeAttribute('data-kael-phase');
  };
}

function setupPointerTracking(
  letterEls: HTMLElement[],
  blockEls: HTMLElement[],
  withdrawableEls: HTMLElement[],
  ref: { current: PointerTrackingState | null },
): () => void {
  if (letterEls.length === 0 && blockEls.length === 0 && withdrawableEls.length === 0) return () => {};

  const state: PointerTrackingState = {
    letters: [],
    blocks: [],
    withdrawables: [],
    pointer: null,
    active: new Set(),
  };
  ref.current = state;

  const measure = () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    state.letters = letterEls.map((el) => {
      const rect = el.getBoundingClientRect();
      return { el, x: rect.left + scrollX + rect.width / 2, y: rect.top + scrollY + rect.height / 2 };
    });
    state.blocks = blockEls.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        rect: {
          left: rect.left + scrollX,
          top: rect.top + scrollY,
          right: rect.right + scrollX,
          bottom: rect.bottom + scrollY,
        },
      };
    });

    // Les retirables ne sont mesurés que s'ils sont tous présents : mesurer
    // pendant un retrait figerait une position fausse.
    if (state.withdrawables.every((entry) => !entry.withdrawn)) {
      state.withdrawables = withdrawableEls.map((el, index) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          rect: {
            left: rect.left + scrollX,
            top: rect.top + scrollY,
            right: rect.right + scrollX,
            bottom: rect.bottom + scrollY,
          },
          withdrawn: state.withdrawables[index]?.withdrawn ?? false,
          timer: 0,
        };
      });
    }
  };

  let resizeTimeout = 0;
  const scheduleMeasure = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(measure, 160);
  };

  const handleMove = (event: PointerEvent) => {
    state.pointer = { x: event.clientX + window.scrollX, y: event.clientY + window.scrollY };
  };

  const handleLeave = () => {
    state.pointer = null;
  };

  measure();
  window.addEventListener('resize', scheduleMeasure);
  window.addEventListener('pointermove', handleMove);
  window.addEventListener('pointerleave', handleLeave);
  document.addEventListener('pointercancel', handleLeave);

  return () => {
    window.clearTimeout(resizeTimeout);
    window.removeEventListener('resize', scheduleMeasure);
    window.removeEventListener('pointermove', handleMove);
    window.removeEventListener('pointerleave', handleLeave);
    document.removeEventListener('pointercancel', handleLeave);

    for (const el of state.active) {
      el.style.removeProperty('--kael-proximity');
      el.style.removeProperty('--kael-proximity-blur');
      el.style.removeProperty('--kael-proximity-y');
    }

    for (const entry of state.withdrawables) {
      window.clearTimeout(entry.timer);
      entry.el.removeAttribute('data-withdrawn');
    }

    ref.current = null;
  };
}

function applyProximity(state: PointerTrackingState) {
  const nextActive = new Set<HTMLElement>();

  if (state.pointer) {
    const { x: px, y: py } = state.pointer;

    for (const { el, x, y } of state.letters) {
      const dist = Math.hypot(x - px, y - py);
      if (dist < POINTER_RADIUS) {
        const t = dist / POINTER_RADIUS;
        const proximity = Math.min(1, 0.05 + t * t * 0.95);
        el.style.setProperty('--kael-proximity', proximity.toFixed(3));
        el.style.setProperty('--kael-proximity-blur', `${(2.6 * (1 - t)).toFixed(2)}px`);
        el.style.setProperty('--kael-proximity-y', `${(-5 * (1 - t)).toFixed(2)}px`);
        nextActive.add(el);
      }
    }

    // Distance au rectangle, pas au centre : un long paragraphe ne doit pas
    // s'effacer entierement parce que le curseur touche son milieu.
    for (const { el, rect } of state.blocks) {
      const dx = Math.max(rect.left - px, 0, px - rect.right);
      const dy = Math.max(rect.top - py, 0, py - rect.bottom);
      const dist = Math.hypot(dx, dy);

      if (dist < BLOCK_POINTER_RADIUS) {
        const t = dist / BLOCK_POINTER_RADIUS;
        // Plancher a 0.12 : l'information reste techniquement presente,
        // le lecteur n'a qu'a ecarter son curseur pour la relire.
        const proximity = Math.min(1, 0.12 + t * t * 0.88);
        el.style.setProperty('--kael-proximity', proximity.toFixed(3));
        el.style.setProperty('--kael-proximity-blur', `${(2.2 * (1 - t)).toFixed(2)}px`);
        nextActive.add(el);
      }
    }
  }

  applyWithdrawal(state);

  for (const el of state.active) {
    if (!nextActive.has(el)) {
      el.style.removeProperty('--kael-proximity');
      el.style.removeProperty('--kael-proximity-blur');
      el.style.removeProperty('--kael-proximity-y');
    }
  }

  state.active = nextActive;
}

function applyWithdrawal(state: PointerTrackingState) {
  for (const entry of state.withdrawables) {
    let dist = Number.POSITIVE_INFINITY;

    if (state.pointer) {
      const { x: px, y: py } = state.pointer;
      const dx = Math.max(entry.rect.left - px, 0, px - entry.rect.right);
      const dy = Math.max(entry.rect.top - py, 0, py - entry.rect.bottom);
      dist = Math.hypot(dx, dy);
    }

    const shouldWithdraw = dist < WITHDRAW_RADIUS;
    const shouldRestore = dist > RESTORE_RADIUS;

    if (shouldWithdraw && !entry.withdrawn && entry.timer === 0) {
      entry.timer = window.setTimeout(() => {
        entry.withdrawn = true;
        entry.timer = 0;
        entry.el.setAttribute('data-withdrawn', '');
      }, WITHDRAW_DELAY_MS);
    } else if (shouldRestore && entry.withdrawn && entry.timer === 0) {
      entry.timer = window.setTimeout(() => {
        entry.withdrawn = false;
        entry.timer = 0;
        entry.el.removeAttribute('data-withdrawn');
      }, RESTORE_DELAY_MS);
    } else if (entry.timer !== 0) {
      // Le curseur a changé d'avis avant la fin du délai : on annule.
      const stillValid = entry.withdrawn ? shouldRestore : shouldWithdraw;
      if (!stillValid) {
        window.clearTimeout(entry.timer);
        entry.timer = 0;
      }
    }
  }
}

function createWisp(width: number, height: number): SmokeWisp {
  const radius = Math.min(width, height) * (0.12 + Math.random() * 0.16);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    speedY: -(0.05 + Math.random() * 0.09),
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.0015 + Math.random() * 0.002,
    opacityPhase: Math.random() * Math.PI * 2,
    opacitySpeed: 0.003 + Math.random() * 0.004,
    baseOpacity: 0.028 + Math.random() * 0.042,
  };
}

const anchorStyle: CSSProperties = { position: 'absolute', width: 0, height: 0, overflow: 'hidden' };

export function KaelSignatureClient() {
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerStateRef = useRef<PointerTrackingState | null>(null);
  const [smokeEnabled, setSmokeEnabled] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    const scene = anchor?.closest<HTMLElement>('section[aria-labelledby="personnage-title"]') ?? null;
    if (!scene) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const identityHeading = scene.querySelector<HTMLElement>('#personnage-identity-title');
    const magicHeading = scene.querySelector<HTMLElement>('#personnage-magic-title');
    const backLink =
      scene.querySelector<HTMLAnchorElement>('a[data-personnage-exit]') ??
      scene.querySelector<HTMLAnchorElement>('a');

    const identityLetters = wrapLetters(identityHeading, styles.labelLetter, 0.28);
    const magicLetters = wrapLetters(magicHeading, styles.labelLetter, 0.28);
    wrapLetters(backLink, styles.exitLetter, 0.25);
    backLink?.setAttribute('data-kael-exit', '');

    const titleEl = scene.querySelector<HTMLElement>('#personnage-title');
    const headerEl = titleEl?.closest<HTMLElement>('header') ?? null;
    const subtitleEl = headerEl?.firstElementChild;
    if (subtitleEl instanceof HTMLElement) {
      subtitleEl.setAttribute('data-kael-subtitle', '');
    }

    const contentEl = findContentWrapper(scene);
    contentEl?.setAttribute('data-kael-content', '');

    const cleanupArrival = reducedMotion ? () => {} : runArrival(scene);

    let cleanupPointer = () => {};
    if (!reducedMotion && finePointer) {
      const titleLetters = Array.from(scene.querySelectorAll<HTMLElement>(`.${styles.letter}`));
      const erasableBlocks = Array.from(scene.querySelectorAll<HTMLElement>('[data-personnage-erasable]'));
      const withdrawables = Array.from(scene.querySelectorAll<HTMLElement>('[data-personnage-withdrawable]'));
      cleanupPointer = setupPointerTracking(
        [...titleLetters, ...identityLetters, ...magicLetters],
        erasableBlocks,
        withdrawables,
        pointerStateRef,
      );
    }

    if (!reducedMotion) {
      setSmokeEnabled(true);
    }

    return () => {
      cleanupArrival();
      cleanupPointer();
    };
  }, []);

  useEffect(() => {
    if (!smokeEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let resizeTimeout = 0;
    let isPaused = false;
    let wisps: SmokeWisp[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(bounds.width));
      const nextHeight = Math.max(1, Math.floor(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = width < 720 ? 12 : 30;
      wisps = Array.from({ length: count }, () => createWisp(width, height));
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 180);
    };

    const draw = () => {
      if (isPaused) return;

      context.clearRect(0, 0, width, height);

      const voidX = width * 0.28;
      const voidY = height * 0.2;
      const voidRadius = Math.min(width, height) * 0.26;

      /*
       * La fumée doit être PLUS CLAIRE que le fond, sinon elle n'existe pas.
       * L'ancienne version dessinait du noir (rgba(3,4,7)) en mode multiply
       * sur un fond quasi noir : mathématiquement invisible.
       *
       * Canon : "un morceau de ciel nocturne sans étoiles, une fumée noire
       * qui s'effiloche". Sur du noir, une fumée noire se lit comme une
       * densité un peu moins noire — pas comme une couleur.
       */
      context.globalCompositeOperation = 'lighter';

      for (const wisp of wisps) {
        wisp.y += wisp.speedY;
        wisp.driftPhase += wisp.driftSpeed;
        wisp.opacityPhase += wisp.opacitySpeed;
        wisp.x += Math.sin(wisp.driftPhase) * 0.12;

        if (wisp.y < -wisp.radius) {
          wisp.y = height + wisp.radius;
          wisp.x = Math.random() * width;
        }

        const distToVoid = Math.hypot(wisp.x - voidX, wisp.y - voidY);
        const voidFactor = distToVoid < voidRadius ? 0.12 + 0.88 * (distToVoid / voidRadius) : 1;
        const breathing = 0.6 + 0.4 * Math.sin(wisp.opacityPhase);
        const alpha = wisp.baseOpacity * breathing * voidFactor;

        const gradient = context.createRadialGradient(wisp.x, wisp.y, 0, wisp.x, wisp.y, wisp.radius);
        gradient.addColorStop(0, `rgba(128, 126, 132, ${alpha})`);
        gradient.addColorStop(1, 'rgba(128, 126, 132, 0)');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(wisp.x, wisp.y, wisp.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = 'source-over';

      if (pointerStateRef.current) {
        applyProximity(pointerStateRef.current);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const pause = () => {
      isPaused = true;
      cancelAnimationFrame(animationFrame);
    };

    const play = () => {
      if (!isPaused) return;
      isPaused = false;
      animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) pause();
      else play();
    };

    resize();
    draw();
    window.addEventListener('resize', scheduleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', scheduleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [smokeEnabled]);

  return (
    <>
      <span ref={anchorRef} aria-hidden="true" style={anchorStyle} />
      {smokeEnabled ? <canvas ref={canvasRef} aria-hidden="true" className={styles.smokeCanvas} /> : null}
    </>
  );
}
