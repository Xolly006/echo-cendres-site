'use client';

import { useEffect, useRef } from 'react';

type AshParticle = {
  x: number;
  y: number;
  radius: number;
  stretch: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  flicker: number;
  kind: 'ash' | 'ember';
};

function createParticle(width: number, height: number): AshParticle {
  const kind = Math.random() < 0.12 ? 'ember' : 'ash';
  const radius = kind === 'ember' ? 0.5 + Math.random() * 1.25 : 0.45 + Math.random() * 1.9;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    stretch: 0.55 + Math.random() * 1.15,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: -0.006 + Math.random() * 0.012,
    speedY: kind === 'ember' ? 0.08 + Math.random() * 0.22 : 0.1 + Math.random() * 0.34,
    speedX: kind === 'ember' ? -0.08 + Math.random() * 0.16 : -0.16 + Math.random() * 0.2,
    opacity: kind === 'ember' ? 0.16 + Math.random() * 0.26 : 0.045 + Math.random() * 0.16,
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.004 + Math.random() * 0.007,
    flicker: Math.random() * Math.PI * 2,
    kind,
  };
}

export function ParticleAsh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let resizeTimeout = 0;
    let isPaused = false;
    let particles: AshParticle[] = [];
    let width = 0;
    let height = 0;

    const getParticleCount = () => {
      if (width < 540) return 42;
      if (width < 900) return 70;
      return 115;
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = getParticleCount();
      particles = Array.from({ length: count }, () => createParticle(width, height));
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 180);
    };

    const draw = () => {
      if (isPaused) return;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';

      for (const particle of particles) {
        particle.drift += particle.driftSpeed;
        particle.rotation += particle.rotationSpeed;
        particle.flicker += particle.kind === 'ember' ? 0.035 : 0.01;
        particle.x += particle.speedX + Math.sin(particle.drift) * (particle.kind === 'ember' ? 0.08 : 0.16);
        particle.y += particle.speedY;

        if (particle.y > height + 12) {
          particle.y = -12;
          particle.x = Math.random() * width;
        }
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        if (particle.kind === 'ember') {
          const glow = particle.radius * 5;
          const flickerOpacity = particle.opacity + Math.sin(particle.flicker) * 0.035;
          const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glow);

          gradient.addColorStop(0, `rgba(244, 175, 95, ${flickerOpacity})`);
          gradient.addColorStop(0.42, `rgba(139, 65, 42, ${flickerOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(28, 24, 24, 0)');

          context.globalCompositeOperation = 'lighter';
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(particle.x, particle.y, glow, 0, Math.PI * 2);
          context.fill();
          context.globalCompositeOperation = 'source-over';
        } else {
          const ashOpacity = particle.opacity + Math.sin(particle.flicker) * 0.012;

          context.save();
          context.translate(particle.x, particle.y);
          context.rotate(particle.rotation);
          context.scale(1, particle.stretch);
          context.fillStyle = `rgba(176, 172, 164, ${ashOpacity})`;
          context.beginPath();
          context.ellipse(0, 0, particle.radius * 1.4, particle.radius * 0.8, 0, 0, Math.PI * 2);
          context.fill();
          context.restore();
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
  }, []);

  return <canvas ref={canvasRef} className="ash-canvas" aria-hidden="true" />;
}
