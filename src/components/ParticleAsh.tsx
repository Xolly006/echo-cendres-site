'use client';

import { useEffect, useRef } from 'react';

type AshParticle = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  drift: number;
};

function createParticle(width: number, height: number): AshParticle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 2.2,
    speedY: 0.18 + Math.random() * 0.55,
    speedX: -0.12 + Math.random() * 0.24,
    opacity: 0.1 + Math.random() * 0.52,
    drift: Math.random() * Math.PI * 2,
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
    let particles: AshParticle[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = width < 760 ? 80 : 150;
      particles = Array.from({ length: count }, () => createParticle(width, height));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      for (const particle of particles) {
        particle.drift += 0.009;
        particle.x += particle.speedX + Math.sin(particle.drift) * 0.12;
        particle.y += particle.speedY;

        if (particle.y > height + 12) {
          particle.y = -12;
          particle.x = Math.random() * width;
        }
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 5,
        );
        gradient.addColorStop(0, `rgba(238, 162, 96, ${particle.opacity})`);
        gradient.addColorStop(0.45, `rgba(132, 62, 43, ${particle.opacity * 0.28})`);
        gradient.addColorStop(1, 'rgba(20, 16, 18, 0)');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="ash-canvas" aria-hidden="true" />;
}
