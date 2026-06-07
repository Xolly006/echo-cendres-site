'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { PersonnageTheme } from '@/types/personnage-theme';

type PersonnageParticlesProps = {
  atmosphere?: PersonnageTheme['atmosphere'];
};

type EmberParticle = {
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

function createEmber(width: number, height: number): EmberParticle {
  const radius = 0.65 + Math.random() * 1.25;
  const nearIntro = Math.random() < 0.62;

  return {
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

function getEmberCount(width: number, intensity: 'low' | 'medium') {
  if (width < 540) return intensity === 'medium' ? 12 : 8;
  if (width < 900) return intensity === 'medium' ? 22 : 16;
  return intensity === 'medium' ? 34 : 26;
}

export function PersonnageParticles({ atmosphere }: PersonnageParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleKind = atmosphere?.particleKind ?? 'none';
  const intensity = atmosphere?.intensity ?? 'low';

  useEffect(() => {
    if (particleKind !== 'embers') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let resizeTimeout = 0;
    let isPaused = false;
    let particles: EmberParticle[] = [];
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
      particles = Array.from({ length: getEmberCount(width, intensity) }, () => createEmber(width, height));
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
        particle.x += particle.speedX + Math.sin(particle.drift) * 0.055;
        particle.y += particle.speedY + Math.cos(particle.drift) * 0.018;

        if (particle.y < -16) {
          particle.y = height + 16;
          particle.x = Math.random() < 0.62 ? width * (0.08 + Math.random() * 0.5) : Math.random() * width;
        }

        if (particle.x < -16) particle.x = width + 16;
        if (particle.x > width + 16) particle.x = -16;

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

  if (particleKind !== 'embers') {
    return null;
  }

  return <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle} />;
}
