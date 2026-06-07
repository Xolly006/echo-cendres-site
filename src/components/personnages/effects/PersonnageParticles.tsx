'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { PersonnageTheme } from '@/types/personnage-theme';

type PersonnageParticlesProps = {
  atmosphere?: PersonnageTheme['atmosphere'];
};

type SupportedParticleKind = 'embers' | 'dust';

type PersonnageParticle = {
  kind: SupportedParticleKind;
  x: number;
  y: number;
  radius: number;
  glow: number;
  speedX: number;
  speedY: number;
  drift: number;
  driftSpeed: number;
  flicker: number;
  flickerSpeed: number;
  opacity: number;
};

const canvasStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
};

function createEmber(width: number, height: number): PersonnageParticle {
  const radius = 0.65 + Math.random() * 1.25;
  const nearIntro = Math.random() < 0.62;

  return {
    kind: 'embers',
    x: nearIntro ? width * (0.08 + Math.random() * 0.5) : Math.random() * width,
    y: nearIntro ? height * (0.14 + Math.random() * 0.46) : Math.random() * height,
    radius,
    glow: radius * (6 + Math.random() * 4.5),
    speedX: -0.04 + Math.random() * 0.08,
    speedY: -(0.03 + Math.random() * 0.1),
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.0025 + Math.random() * 0.005,
    flicker: Math.random() * Math.PI * 2,
    flickerSpeed: 0.014 + Math.random() * 0.018,
    opacity: 0.13 + Math.random() * 0.18,
  };
}

function createDust(width: number, height: number): PersonnageParticle {
  const radius = 0.55 + Math.random() * 1.05;

  return {
    kind: 'dust',
    x: Math.random() * width,
    y: height * (0.06 + Math.random() * 0.72),
    radius,
    glow: radius * (1.8 + Math.random() * 1.8),
    speedX: -0.012 + Math.random() * 0.024,
    speedY: -0.006 + Math.random() * 0.018,
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.0012 + Math.random() * 0.0024,
    flicker: Math.random() * Math.PI * 2,
    flickerSpeed: 0.004 + Math.random() * 0.006,
    opacity: 0.045 + Math.random() * 0.075,
  };
}

function getParticleCount(width: number, intensity: 'low' | 'medium', particleKind: SupportedParticleKind) {
  if (particleKind === 'dust') {
    if (width < 540) return intensity === 'medium' ? 6 : 4;
    if (width < 900) return intensity === 'medium' ? 10 : 7;
    return intensity === 'medium' ? 14 : 10;
  }

  if (width < 540) return intensity === 'medium' ? 12 : 8;
  if (width < 900) return intensity === 'medium' ? 22 : 16;
  return intensity === 'medium' ? 34 : 26;
}

function createParticle(width: number, height: number, particleKind: SupportedParticleKind) {
  return particleKind === 'dust' ? createDust(width, height) : createEmber(width, height);
}

export function PersonnageParticles({ atmosphere }: PersonnageParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleKind = atmosphere?.particleKind ?? 'none';
  const intensity = atmosphere?.intensity ?? 'low';

  useEffect(() => {
    if (particleKind !== 'embers' && particleKind !== 'dust') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let resizeTimeout = 0;
    let isPaused = false;
    let particles: PersonnageParticle[] = [];
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
      particles = Array.from({ length: getParticleCount(width, intensity, particleKind) }, () =>
        createParticle(width, height, particleKind),
      );
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 180);
    };

    const draw = () => {
      if (isPaused) return;

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.drift += particle.driftSpeed;
        particle.flicker += particle.flickerSpeed;
        const driftScale = particle.kind === 'dust' ? 0.018 : 0.055;
        const verticalDrift = particle.kind === 'dust' ? 0.006 : 0.018;
        particle.x += particle.speedX + Math.sin(particle.drift) * driftScale;
        particle.y += particle.speedY + Math.cos(particle.drift) * verticalDrift;

        if (particle.y < -16) {
          particle.y = height + 16;
          particle.x =
            particle.kind === 'embers' && Math.random() < 0.62
              ? width * (0.08 + Math.random() * 0.5)
              : Math.random() * width;
        }

        if (particle.y > height + 16) {
          particle.y = -16;
          particle.x = Math.random() * width;
        }

        if (particle.x < -16) particle.x = width + 16;
        if (particle.x > width + 16) particle.x = -16;

        if (particle.kind === 'dust') {
          const dustOpacity = Math.max(0.025, particle.opacity + Math.sin(particle.flicker) * 0.018);

          context.fillStyle = `rgba(174, 188, 202, ${dustOpacity})`;
          context.beginPath();
          context.ellipse(particle.x, particle.y, particle.radius * 1.35, particle.radius * 0.7, 0, 0, Math.PI * 2);
          context.fill();
        } else {
          const flickerOpacity = Math.max(0.08, particle.opacity + Math.sin(particle.flicker) * 0.045);
          const gradient = context.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.glow,
          );

          gradient.addColorStop(0, `rgba(248, 176, 96, ${flickerOpacity})`);
          gradient.addColorStop(0.36, `rgba(196, 88, 47, ${flickerOpacity * 0.38})`);
          gradient.addColorStop(1, 'rgba(28, 16, 12, 0)');

          context.globalCompositeOperation = 'lighter';
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.glow, 0, Math.PI * 2);
          context.fill();
          context.globalCompositeOperation = 'source-over';
        }
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
      if (document.hidden) {
        pause();
      } else {
        play();
      }
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
  }, [intensity, particleKind]);

  if (particleKind !== 'embers' && particleKind !== 'dust') {
    return null;
  }

  return <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle} />;
}
