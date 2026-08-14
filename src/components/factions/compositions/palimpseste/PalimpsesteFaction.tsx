'use client';

import { useEffect, useRef } from 'react';
import type { FactionCompositionProps } from '../types';

/**
 * Composition "palimpseste" — L'Ordre de l'Arquet.
 *
 * Rendu intégral en styles inline : la page est une coupe stratigraphique
 * dont le cadre chromatique se refroidit au fil du défilement, et les
 * styles inline garantissent qu'aucune règle de globals.css ne s'y mêle.
 * Cinq fonds fixes (public/factions/ordre-de-l-arquet/) se relaient sur
 * des ancres explicites [data-fond] (docs/ARQUET_COMPOSITION.md §5).
 */

const POLICES =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Spectral:ital,wght@0,300;0,400;0,500;1,300&family=Space+Grotesk:wght@400;500;700&display=swap';

const CSS_GLOBAL = `
html[data-arquet] { background: #08080a; scroll-behavior: smooth; }
html[data-arquet] body { margin: 0; background: #08080a; color: #b4a894; }
html[data-arquet] ::selection { background: rgba(201,161,95,0.24); }
.arq-rail-item:hover { color: rgba(239,230,214,0.9) !important; }
@media (prefers-reduced-motion: reduce) { html[data-arquet] { scroll-behavior: auto; } }
`;

type Props = FactionCompositionProps & {
  /** Pluie de cendres (désactivée si prefers-reduced-motion). */
  cendres?: boolean;
  /** Opacité maximale des fonds photographiques. */
  intensiteImages?: number;
  /** Coupe des strates à gauche (masquée sous 1180px). */
  rail?: boolean;
};

export function PalimpsesteFaction({ cendres = true, intensiteImages = 0.6, rail = true, previewStatus }: Props) {
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Polices + règles non exprimables en inline, injectées une seule fois.
    const ajoutes: HTMLElement[] = [];
    if (!document.getElementById('arq-polices')) {
      const l = document.createElement('link');
      l.id = 'arq-polices';
      l.rel = 'stylesheet';
      l.href = POLICES;
      document.head.appendChild(l);
      ajoutes.push(l);
    }
    if (!document.getElementById('arq-css')) {
      const s = document.createElement('style');
      s.id = 'arq-css';
      s.textContent = CSS_GLOBAL;
      document.head.appendChild(s);
      ajoutes.push(s);
    }
    document.documentElement.setAttribute('data-arquet', '');

    // La composition remplace la mise en page : on neutralise le gabarit
    // .directory-page qui l'enveloppe (padding, largeur, fond).
    const gabarit = racine.current?.closest('main') as HTMLElement | null;
    const memoire = gabarit?.getAttribute('style') ?? null;
    if (gabarit) {
      gabarit.style.padding = '0';
      gabarit.style.margin = '0';
      gabarit.style.maxWidth = 'none';
      gabarit.style.width = '100%';
      gabarit.style.background = 'transparent';
    }

    const q = <T extends HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));
    const images = q<HTMLElement>('.arq-img');
    const froid = document.getElementById('arq-voile-froid');
    const chaud = document.getElementById('arq-voile-chaud');
    const coupe = document.getElementById('arq-rail');
    const railItems = q<HTMLElement>('.arq-rail-item');
    const sections = q<HTMLElement>('[data-strate]');
    const canvas = document.getElementById('arq-cendres') as HTMLCanvasElement | null;
    const ancres = q<HTMLElement>('[data-fond]');
    const nuit = document.getElementById('arq-nuit');
    const jauge = document.getElementById('arq-jauge');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cendresOn = cendres && !reduced;

    let maxProg = 0;
    let prog = 0;

    const applique = () => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      prog = parcourable > 0 ? Math.min(1, Math.max(0, window.scrollY / parcourable)) : 0;
      if (prog > maxProg) maxProg = prog;

      // L'image de fond suit la strate lue, pas un pourcentage abstrait :
      // cloître→I, manuscrit→III, galerie→Arkadia, lettres→V, hall→assèchement.
      const mid = window.innerHeight * 0.45;
      let cible = 0;
      let mix = 1;
      ancres.forEach((a) => {
        const r = a.getBoundingClientRect();
        if (r.top < mid) {
          cible = Number(a.dataset.fond);
          mix = Math.min(1, (mid - r.top) / Math.max(1, window.innerHeight * 0.35));
        }
      });
      const prec = Math.max(0, cible - 1);
      const attenuation = 1 - cible * 0.09;
      const par = (window.scrollY % (window.innerHeight * 2)) / (window.innerHeight * 2);
      images.forEach((el, n) => {
        let o = 0;
        if (n === cible) o = intensiteImages * mix * attenuation;
        else if (n === prec && prec !== cible) o = intensiteImages * (1 - mix) * attenuation;
        el.style.opacity = String(o);
        if (o > 0) el.style.transform = 'scale(' + (1.14 - 0.06 * mix) + ') translateY(' + (-2 + par * 4) + '%)';
      });

      // Le cadre ne revient jamais en arrière.
      if (froid) froid.style.opacity = String(Math.min(1, maxProg * 1.15));
      if (chaud) chaud.style.opacity = String(1 - Math.min(0.82, maxProg * 1.1));
      if (nuit) nuit.style.opacity = String(Math.min(1, Math.max(0, (maxProg - 0.45) / 0.55)));
      if (jauge) {
        jauge.style.width = (prog * 100).toFixed(2) + '%';
        jauge.style.background =
          'linear-gradient(90deg, rgba(201,161,95,0.12), rgb(' +
          Math.round(201 - 41 * maxProg) + ',' + Math.round(161 + 12 * maxProg) + ',' + Math.round(95 + 117 * maxProg) + '))';
      }

      let courante = 0;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.5) courante = Number(s.dataset.strate);
      });
      railItems.forEach((el, n) => {
        const actif = n + 1 === courante;
        el.style.color = actif
          ? 'rgba(239,230,214,0.95)'
          : n + 1 < courante
            ? 'rgba(180,168,148,0.5)'
            : 'rgba(180,168,148,0.2)';
        el.style.boxShadow = actif ? 'inset 3px 0 0 rgba(201,161,95,0.8)' : 'none';
      });

      const niveau = document.getElementById('arq-niveau');
      const cote = document.getElementById('arq-cote');
      if (niveau) niveau.style.top = (prog * 100).toFixed(2) + '%';
      if (cote) cote.textContent = Math.round(prog * 100) + ' %';

      // La coupe ne doit jamais chevaucher la colonne de lecture.
      const coupeVisible = rail && window.innerWidth >= 1180;
      if (coupe) coupe.style.display = coupeVisible ? 'flex' : 'none';
      const zone = document.getElementById('arq-main');
      if (zone) zone.style.paddingLeft = coupeVisible ? 'clamp(7rem,10vw,11rem)' : 'clamp(1.2rem,6vw,5rem)';
    };

    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        applique();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    applique();

    // Apparitions : les éléments montent en place, en cascade.
    // Les styles de départ sont posés par JS — sans JS, tout reste visible.
    let io: IntersectionObserver | null = null;
    if (!reduced && 'IntersectionObserver' in window) {
      const cibles = q<HTMLElement>(
        '#arq-main > header > *, #arq-main > section > h2, #arq-main > section > h3, #arq-main > section > p, #arq-main > section > blockquote, #arq-main > section > div, #arq-main > section > ol > li, #arq-main > section > ul > li',
      );
      cibles.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.filter = 'blur(3px)';
        el.style.willChange = 'opacity, transform';
        el.style.transition =
          'opacity 900ms cubic-bezier(.22,.61,.36,1), transform 1000ms cubic-bezier(.22,.61,.36,1), filter 900ms ease';
      });
      io = new IntersectionObserver(
        (entrees) => {
          let rang = 0;
          entrees.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const delai = Math.min(rang * 85, 420);
            rang += 1;
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              el.style.filter = 'none';
              setTimeout(() => {
                el.style.willChange = 'auto';
              }, 1100);
            }, delai);
            io?.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );
      cibles.forEach((el) => io?.observe(el));
    }

    // Cendres.
    let raf = 0;
    let onResizeCanvas: (() => void) | null = null;
    const ctx = canvas && cendresOn ? canvas.getContext('2d') : null;
    if (canvas && ctx) {
      let w = 0;
      let h = 0;
      let parts: Array<{ x: number; y: number; r: number; vy: number; vx: number; d: number; ds: number; o: number; ember: boolean }> = [];

      const build = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = w < 640 ? 32 : w < 1100 ? 56 : 82;
        parts = Array.from({ length: n }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + Math.random() * 1.5,
          vy: -0.06 - Math.random() * 0.22,
          vx: -0.06 + Math.random() * 0.12,
          d: Math.random() * Math.PI * 2,
          ds: 0.003 + Math.random() * 0.006,
          o: 0.06 + Math.random() * 0.2,
          ember: Math.random() < 0.16,
        }));
      };

      const draw = () => {
        const p = prog;
        ctx.clearRect(0, 0, w, h);
        for (const s of parts) {
          s.d += s.ds;
          s.x += s.vx + Math.sin(s.d) * 0.14;
          s.y += s.vy * (1 - p * 0.45);
          if (s.y < -14) {
            s.y = h + 14;
            s.x = Math.random() * w;
          }
          if (s.x < -14) s.x = w + 14;
          if (s.x > w + 14) s.x = -14;

          const r = Math.round(226 - 60 * p);
          const g = Math.round(186 - 6 * p);
          const b = Math.round(118 + 80 * p);
          const alpha = s.o * (s.ember ? 1 : 0.62);

          if (s.ember && p < 0.6) {
            const glow = s.r * 5;
            const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow);
            grd.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + alpha * (1 - p) + ')');
            grd.addColorStop(1, 'rgba(20,18,16,0)');
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(s.x, s.y, glow, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
          } else {
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
            ctx.beginPath();
            ctx.ellipse(s.x, s.y, s.r * 1.3, s.r * 0.75, s.d, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        raf = requestAnimationFrame(draw);
      };

      build();
      onResizeCanvas = () => build();
      window.addEventListener('resize', onResizeCanvas);
      draw();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (onResizeCanvas) window.removeEventListener('resize', onResizeCanvas);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      document.documentElement.removeAttribute('data-arquet');
      if (gabarit) {
        if (memoire === null) gabarit.removeAttribute('style');
        else gabarit.setAttribute('style', memoire);
      }
      ajoutes.forEach((el) => el.remove());
    };
  }, [cendres, intensiteImages, rail]);

  return (
    <div ref={racine}>
      <div id="arq-fonds" style={{ position: "fixed", inset: "0", zIndex: "0", pointerEvents: "none", overflow: "hidden" }}>
        <div className="arq-img" style={{ position: "absolute", inset: "0", opacity: "0.3", filter: "saturate(0.6) contrast(1.05)", backgroundImage: "url('/factions/ordre-de-l-arquet/cloitre.webp')", backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.08)", transformOrigin: "center", transition: "opacity 700ms linear, transform 1400ms cubic-bezier(.22,.61,.36,1)" }}></div>
        <div className="arq-img" style={{ position: "absolute", inset: "0", opacity: "0", filter: "saturate(0.6) contrast(1.05)", backgroundImage: "url('/factions/ordre-de-l-arquet/manuscrit.webp')", backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.08)", transformOrigin: "center", transition: "opacity 700ms linear, transform 1400ms cubic-bezier(.22,.61,.36,1)" }}></div>
        <div className="arq-img" style={{ position: "absolute", inset: "0", opacity: "0", filter: "saturate(0.6) contrast(1.05)", backgroundImage: "url('/factions/ordre-de-l-arquet/galerie.webp')", backgroundSize: "cover", backgroundPosition: "center 32%", transform: "scale(1.08)", transformOrigin: "center", transition: "opacity 700ms linear, transform 1400ms cubic-bezier(.22,.61,.36,1)" }}></div>
        <div className="arq-img" style={{ position: "absolute", inset: "0", opacity: "0", filter: "saturate(0.6) contrast(1.05)", backgroundImage: "url('/factions/ordre-de-l-arquet/lettres.webp')", backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.08)", transformOrigin: "center", transition: "opacity 700ms linear, transform 1400ms cubic-bezier(.22,.61,.36,1)" }}></div>
        <div className="arq-img" style={{ position: "absolute", inset: "0", opacity: "0", filter: "saturate(0.55) contrast(1.04)", backgroundImage: "url('/factions/ordre-de-l-arquet/hall.webp')", backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.08)", transformOrigin: "center", transition: "opacity 700ms linear, transform 1400ms cubic-bezier(.22,.61,.36,1)" }}></div>
        <div id="arq-voile-chaud" style={{ position: "absolute", inset: "0", background: "radial-gradient(circle at 50% 8%, rgba(140,96,42,0.34), transparent 56%), linear-gradient(180deg, rgba(14,11,8,0.52) 0%, rgba(12,10,8,0.72) 42%, rgba(10,9,8,0.88) 100%)" }}></div>
        <div id="arq-voile-froid" style={{ position: "absolute", inset: "0", opacity: "0", background: "linear-gradient(180deg, rgba(7,8,9,0.74) 0%, rgba(7,8,9,0.88) 45%, rgba(4,5,6,0.97) 100%)" }}></div>
        <div style={{ position: "absolute", inset: "0", background: "radial-gradient(ellipse at 50% 45%, transparent 34%, rgba(4,4,5,0.72) 100%)" }}></div>
        <div id="arq-nuit" style={{ position: "absolute", inset: "0", opacity: "0", background: "linear-gradient(180deg, transparent 0%, rgba(2,3,4,0.55) 60%, rgba(1,2,3,0.85) 100%)" }}></div>
      </div>

      <div id="arq-jauge" style={{ position: "fixed", top: "0", left: "0", height: "2px", width: "0%", zIndex: "6", background: "linear-gradient(90deg, rgba(201,161,95,0.15), #c9a15f)", boxShadow: "0 0 14px rgba(201,161,95,0.5)" }}></div>

      <canvas id="arq-cendres" aria-hidden="true" style={{ position: "fixed", inset: "0", zIndex: "1", pointerEvents: "none" }}></canvas>

      <nav id="arq-rail" aria-label="Coupe des strates" style={{ position: "fixed", left: "0", top: "0", bottom: "0", width: "clamp(4.6rem,6vw,6.4rem)", zIndex: "6", display: "flex", flexDirection: "column", borderRight: "1px solid rgba(200,205,212,0.1)", background: "linear-gradient(90deg, rgba(6,6,7,0.72), rgba(6,6,7,0.28))", backdropFilter: "blur(2px)", fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>
        <a className="arq-rail-item" href="#strate-1" title="An 0 · Les Chercheurs de l’Arché" style={{ position: "relative", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.9rem 0.7rem", textDecoration: "none", color: "rgba(180,168,148,0.28)", borderBottom: "1px solid rgba(200,205,212,0.09)", background: "linear-gradient(180deg, rgba(150,104,48,0.16), rgba(150,104,48,0.04))", transition: "color 600ms ease, background 700ms ease", overflow: "hidden" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", lineHeight: "1" }}>I</span>
          <span style={{ writingMode: "vertical-rl", fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: "0.75" }}>An 0</span>
        </a>
        <a className="arq-rail-item" href="#strate-2" title="~An 400 · La Confrérie du Seuil" style={{ position: "relative", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.9rem 0.7rem", textDecoration: "none", color: "rgba(180,168,148,0.24)", borderBottom: "1px solid rgba(200,205,212,0.09)", background: "linear-gradient(180deg, rgba(130,96,52,0.12), rgba(120,92,56,0.03))", transition: "color 600ms ease, background 700ms ease", overflow: "hidden" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", lineHeight: "1" }}>II</span>
          <span style={{ writingMode: "vertical-rl", fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: "0.75" }}>An 400</span>
        </a>
        <a className="arq-rail-item" href="#strate-3" title="~An 900 · L’Ordre des Éclipsés" style={{ position: "relative", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.9rem 0.7rem", textDecoration: "none", color: "rgba(170,170,168,0.24)", borderBottom: "1px solid rgba(200,205,212,0.09)", background: "linear-gradient(180deg, rgba(110,104,92,0.1), rgba(96,98,98,0.03))", transition: "color 600ms ease, background 700ms ease", overflow: "hidden" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", lineHeight: "1" }}>III</span>
          <span style={{ writingMode: "vertical-rl", fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: "0.75" }}>An 900</span>
        </a>
        <a className="arq-rail-item" href="#strate-4" title="An 1800 · L’Arquet" style={{ position: "relative", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.9rem 0.7rem", textDecoration: "none", color: "rgba(190,198,206,0.24)", borderBottom: "1px solid rgba(200,205,212,0.09)", background: "linear-gradient(180deg, rgba(74,84,94,0.12), rgba(60,70,80,0.04))", transition: "color 600ms ease, background 700ms ease", overflow: "hidden" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", lineHeight: "1" }}>IV</span>
          <span style={{ writingMode: "vertical-rl", fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: "0.75" }}>An 1800</span>
        </a>
        <a className="arq-rail-item" href="#strate-5" title="La main — les Cinq Doigts" style={{ position: "relative", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.9rem 0.7rem", textDecoration: "none", color: "rgba(190,198,206,0.24)", background: "linear-gradient(180deg, rgba(40,48,58,0.16), rgba(20,24,30,0.1))", transition: "color 600ms ease, background 700ms ease", overflow: "hidden" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", lineHeight: "1" }}>V</span>
          <span style={{ writingMode: "vertical-rl", fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: "0.75" }}>Aujourd’hui</span>
        </a>
        <div id="arq-niveau" style={{ position: "absolute", left: "0", right: "0", top: "0", height: "0", pointerEvents: "none" }}>
          <span style={{ position: "absolute", left: "0", right: "0", top: "0", height: "1px", background: "rgba(201,161,95,0.85)", boxShadow: "0 0 10px rgba(201,161,95,0.55)" }}></span>
          <span style={{ position: "absolute", right: "-3px", top: "-3px", width: "6px", height: "6px", background: "#c9a15f", transform: "rotate(45deg)" }}></span>
          <span id="arq-cote" style={{ position: "absolute", right: "0.55rem", top: "0.4rem", fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,161,95,0.85)" }}>0 %</span>
        </div>
      </nav>

      <div id="arq-main" style={{ position: "relative", zIndex: "2", fontFamily: "'Spectral',Georgia,serif", padding: "0 clamp(1.2rem,6vw,5rem) clamp(6rem,14vh,11rem)", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <header style={{ minHeight: "100svh", width: "100%", maxWidth: "58rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.4rem", padding: "6rem 0 5rem" }}>
          {previewStatus === 'draft' ? (
            <span style={{ display: "inline-flex", alignSelf: "flex-start", marginBottom: "-1rem", border: "1px solid rgba(201,161,95,0.6)", borderRadius: "999px", padding: "0.34rem 0.75rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: "700", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a15f" }}>Preview draft</span>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
            <span style={{ display: "block", width: "1.6rem", height: "1.6rem", border: "1px solid rgba(201,161,95,0.75)", borderRadius: "50%", flex: "none" }}></span>
            <span style={{ display: "block", width: "clamp(2rem,8vw,6rem)", height: "1px", background: "linear-gradient(90deg, rgba(201,161,95,0.6), rgba(201,161,95,0))" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.68rem", fontWeight: "500", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a15f" }}>Arché — le principe premier</span>
          </div>
          <h1 style={{ margin: "0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "300", fontSize: "clamp(3.2rem,10.5vw,8.4rem)", lineHeight: "0.9", letterSpacing: "0.005em", color: "#efe4cf", textWrap: "balance" }}>L’Ordre<br />de l’Arquet</h1>
          <p style={{ margin: "0", maxWidth: "34rem", fontSize: "1.08rem", lineHeight: "1.9", color: "#b7a993", textWrap: "pretty" }}>Une société de récupération devenue un tissu administratif. Dix-huit siècles, quatre noms, et un argument que personne n’a réussi à réfuter.</p>
          <p style={{ margin: "0", maxWidth: "38rem", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "clamp(1.35rem,3vw,1.9rem)", lineHeight: "1.5", color: "#d8c9ab", textWrap: "pretty" }}>« L’Arquet n’est pas né d’une ambition, mais d’une nécessité. » Une nécessité a toujours quelqu’un qui l’a ressentie en premier — et ce n’était pas Astraevor.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem 2.4rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(201,161,95,0.18)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(180,164,138,0.62)" }}>
            <span>Fondé après le Grand Silence</span>
            <span>Formalisé An 1800</span>
            <span>Sept sièges</span>
          </div>
        </header>

        <section id="strate-1" data-strate="1" data-screen-label="Strate I — Les Chercheurs de l'Arché" style={{ position: "relative", width: "100%", maxWidth: "34rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "clamp(1.5rem,7vh,5rem)", left: "-0.06em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(9rem,26vw,20rem)", lineHeight: "0.72", color: "rgba(201,161,95,0.055)", pointerEvents: "none", userSelect: "none" }}>I</span>
          <div data-fond="0" style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(201,161,95,0.26)" }}>
            <span style={{ display: "block", width: "1.05rem", height: "1.05rem", border: "1px solid #c9a15f", borderRadius: "50%", flex: "none" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.24em", textTransform: "uppercase", color: "#c9a15f" }}>Strate I</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(201,161,95,0.22)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,161,95,0.68)", textAlign: "right" }}>An 0 · Les Chercheurs de l’Arché</span>
          </div>
          <p style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "0.98rem", color: "rgba(179,166,146,0.72)" }}>Le cloître — une communauté d’érudits. La lumière ne tombe sur personne.</p>
          <h2 style={{ margin: "1.8rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "400", fontSize: "clamp(2rem,4.8vw,3rem)", lineHeight: "1.08", color: "#e6d8bf", textWrap: "balance" }}>Le mot que les premiers philosophes employaient pour le principe premier</h2>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>Ce dont tout procède, la substance originelle. Thalès disait l’eau, Héraclite le feu, Anaximandre l’indéfini : ce qui précède toute forme.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>L’organisation a tordu la question dans un sens précis. Si l’Arché est ce qui précède toute forme, ce n’est pas une matière — c’est le Vide qui précède la Création. Le nom n’est pas une prétention. C’est une adresse.</p>
          <blockquote style={{ margin: "2.6rem 0 0", borderLeft: "1px solid rgba(201,161,95,0.5)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "clamp(1.25rem,2.6vw,1.6rem)", lineHeight: "1.55", color: "#dccfb4" }}>Ce n’est pas un club de mages puissants. C’est une entreprise archéologique avec une armée.</blockquote>
          <h3 style={{ margin: "3rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "500", fontSize: "1.55rem", color: "#c9a15f" }}>Ce que les membres croient chercher</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>La quasi-totalité de l’organisation pense faire de la philosophie radicale : trouver le fond des choses, la vérité que les Piliers dissimulent, la couche du dessous. Ils n’ont pas tort — les Elders ont posé la classification des Éveils par-dessus une ressource libre, Celestia a posé la voie angélique par-dessus le sacré.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>Ce que les membres ignorent, c’est qu’un seul homme sait déjà ce qu’il y a en bas et ne cherche rien — il creuse vers une serrure précise.</p>
          <h3 style={{ margin: "3rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "500", fontSize: "1.55rem", color: "#c9a15f" }}>L’origine — l’Ombre du Cercle</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>Le Cercle de l’Unité éclate à la seconde où Klein se scelle. Sylvia meurt de chagrin, Gora devient une montagne, Elian construit une cage, Fenris part vers le nord. Et Vyl s’en va sans un mot.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>Ce qu’il fonde n’est pas une organisation criminelle : une société de récupération. Cinq amis venaient de perdre le sixième, et un seul a refusé le deuil. Vyl s’est mis à rassembler ce qui restait de Klein dans le monde — les dix armes dispersées, les carnets de Sylvia, tout objet ayant porté sa magie. Il ne collectionnait pas des artefacts : il rassemblait un homme.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>On lui prête un vol impossible : le seul être à avoir dérobé une écaille à Bahamut pendant son sommeil. Ce n’est pas un exploit de guerrier, c’est un exploit de collectionneur. <em style={{ color: "#d3c4a7" }}>On ne cambriole pas un Monarque endormi par hasard — on le fait parce qu’on a une liste.</em></p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.06rem", lineHeight: "1.9", color: "#b4a894", textWrap: "pretty" }}>Des siècles plus tard, un homme aux constellations dans l’œil a trouvé une infrastructure parfaitement rodée, entièrement dévouée à ramener quelqu’un qui dormait dans un cristal. Il n’a eu qu’à changer le nom du dormeur.</p>
        </section>

        <section id="strate-2" data-strate="2" data-screen-label="Strate II — La Confrérie du Seuil" style={{ position: "relative", width: "100%", maxWidth: "36rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "clamp(1.5rem,7vh,5rem)", left: "-0.06em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(9rem,26vw,20rem)", lineHeight: "0.72", color: "rgba(182,161,132,0.05)", pointerEvents: "none", userSelect: "none" }}>II</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(182,161,132,0.24)" }}>
            <span style={{ position: "relative", display: "block", width: "1.05rem", height: "1.05rem", border: "1px solid #b6a184", borderRadius: "50%", flex: "none" }}><span style={{ position: "absolute", left: "-0.25rem", top: "0.5rem", width: "1.55rem", height: "1px", background: "#b6a184" }}></span></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.24em", textTransform: "uppercase", color: "#b6a184" }}>Strate II</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(182,161,132,0.2)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(182,161,132,0.68)", textAlign: "right" }}>~An 400 · La Confrérie du Seuil</span>
          </div>
          <h2 style={{ margin: "1.8rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "400", fontSize: "clamp(1.95rem,4.6vw,2.9rem)", lineHeight: "1.1", color: "#ddd1bb", textWrap: "balance" }}>Un ordre qui s’est fait mercenaire pour survivre</h2>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1.05rem", lineHeight: "1.8", color: "#a89c8d", textWrap: "pretty" }}>Quand les royaumes cessent de financer la garde du cristal, l’ordre se vend. Compagnies franches, escortes de caravanes, recouvrement de dettes magiques. C’est là qu’ils apprennent ce qui les définira : une organisation qui rend des services indispensables ne se fait pas dissoudre.</p>
          <h3 style={{ margin: "2.8rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: "500", fontSize: "1.5rem", color: "#b6a184" }}>La Marque Primitive</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.05rem", lineHeight: "1.8", color: "#a89c8d", textWrap: "pretty" }}>Ni encre ni rituel : exposition directe aux résidus dans les fissures profondes. Environ 40 % de survie. Amplification incontrôlée, pouvoirs qui mutent, personnalité qui se fragmente en quelques années.</p>
          <blockquote style={{ margin: "2.4rem 0 0", borderLeft: "1px solid rgba(182,161,132,0.5)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "clamp(1.2rem,2.5vw,1.5rem)", lineHeight: "1.55", color: "#d2c5ae" }}>On ne recrutait pas — on essayait des gens.</blockquote>
        </section>

        <section id="strate-3" data-strate="3" data-screen-label="Strate III — L'Ordre des Éclipsés" style={{ position: "relative", width: "100%", maxWidth: "40rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "clamp(1.5rem,7vh,5rem)", left: "-0.06em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(9rem,26vw,20rem)", lineHeight: "0.72", color: "rgba(154,160,162,0.05)", pointerEvents: "none", userSelect: "none" }}>III</span>
          <div data-fond="1" style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(154,160,162,0.22)" }}>
            <span style={{ position: "relative", display: "block", width: "1.05rem", height: "1.05rem", border: "1px solid #9aa0a2", borderRadius: "50%", flex: "none", overflow: "hidden" }}><span style={{ position: "absolute", left: "0.32rem", top: "-0.12rem", width: "1.1rem", height: "1.3rem", background: "#0a0b0c", borderRadius: "50%" }}></span></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.24em", textTransform: "uppercase", color: "#9aa0a2" }}>Strate III</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(154,160,162,0.18)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(154,160,162,0.68)", textAlign: "right" }}>~An 900 · L’Ordre des Éclipsés</span>
          </div>
          <p style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "0.96rem", color: "rgba(164,157,149,0.72)" }}>Le manuscrit — l’or est dans l’encre, pas dans une couronne.</p>
          <h2 style={{ margin: "1.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "400", fontSize: "clamp(1.75rem,4vw,2.5rem)", lineHeight: "1.16", color: "#d3d2cc", textWrap: "balance" }}>Ils cessent de se battre et se mettent à financer</h2>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}>Camouflage quasi religieux. C’est la période des Faux Piliers et de la Maison de Prêt : guerres, expéditions, académies. Une maison à qui la moitié des royaumes doit de l’argent n’est attaquable par aucun d’eux.</p>
          <h3 style={{ margin: "2.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "1.02rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9aa0a2" }}>Les Faux Piliers</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}>Après le Grand Silence le mana s’appauvrit ; l’Univers ne produit plus assez d’humains à structure adéquate. Sièges vacants, concepts sans porteurs. L’Arquet fournit des candidats — la Marque amplifie assez pour tromper n’importe quel observateur extérieur, et le plafond de verre ne se voit pas tant qu’on n’exige pas un Domaine Absolu.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}><strong style={{ color: "#c6c4bd", fontWeight: "500" }}>Le Tailleur</strong> s’annonçait comme le Nouveau Thanatos : quarante ans de règne, dissipé en quelques secondes le jour où un véritable Pilier de la Mort a émergé. La comparaison a été plus humiliante que la défaite.</p>
          <h3 style={{ margin: "2.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "1.02rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9aa0a2" }}>La Recousue — ère de la Marque Rituelle</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}>Ancienne élève de la Reine Rouge, préparée à hériter du siège de la Vie. À la mort de sa maîtresse, l’Univers a désigné quelqu’un d’autre. Sa magie n’était pas la guérison mais la persistance : démembrée intégralement, chaque morceau restait vivant, conscient, opérationnel.</p>
          <p style={{ margin: "1.2rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}>Sa fin : on ne l’a pas tuée. Un piège préparé sur des mois, un terrain creusé entre des piliers de roche scellés, refermé sur elle. Elle a manqué d’air, lentement, pendant que sa propre magie réparait indéfiniment ce que l’asphyxie détruisait. <em style={{ color: "#c6c4bd" }}>Nul ne l’a jamais déclarée morte. On dit seulement qu’elle a été enterrée.</em></p>

          <div data-fond="2" style={{ margin: "3.4rem 0 0", paddingTop: "1.2rem", borderTop: "1px solid rgba(154,160,162,0.18)", display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ margin: "0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "1.02rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9aa0a2" }}>Arkadia</h3>
            <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "1.05rem", color: "rgba(164,157,149,0.8)" }}>quatre phases, trois siècles — la galerie de portraits, une noblesse qui doit son arbre généalogique à l’Annulaire sans le savoir.</span>
          </div>
          <p style={{ margin: "1.4rem 0 0", fontSize: "1.04rem", lineHeight: "1.72", color: "#9a938d", textWrap: "pretty" }}>Arkadia n’a jamais été conquise. Elle a été refinancée.</p>
          <ol style={{ margin: "2rem 0 0", padding: "0", listStyle: "none", display: "grid", gap: "1.7rem" }}>
            <li style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "1.3rem", alignItems: "start" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9aa0a2", paddingTop: "0.45rem", borderTop: "1px solid rgba(154,160,162,0.26)" }}>Phase 1</span>
              <span style={{ fontSize: "1rem", lineHeight: "1.72", color: "#9a938d" }}><strong style={{ color: "#c6c4bd", fontWeight: "500" }}>Le crédit.</strong> Sous le camouflage de la Maison de Prêt, l’organisation finance les grands travaux — infrastructures, expéditions, académies. Taux honnêtes, remboursements souples, aucune contrepartie politique. Personne ne se méfie de gens qui ne demandent rien.</span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "1.3rem", alignItems: "start" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9aa0a2", paddingTop: "0.45rem", borderTop: "1px solid rgba(154,160,162,0.26)" }}>Phase 2</span>
              <span style={{ fontSize: "1rem", lineHeight: "1.72", color: "#9a938d" }}><strong style={{ color: "#c6c4bd", fontWeight: "500" }}>La dépendance.</strong> Un royaume qui emprunte souvent finit par emprunter pour rembourser. La Maison ne réclame jamais : elle rééchelonne. Chaque rééchelonnement s’accompagne d’une demande minuscule — un poste d’archiviste, une exemption de fouille, l’accès à un registre. Rien qui vaille un refus.</span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "1.3rem", alignItems: "start" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9aa0a2", paddingTop: "0.45rem", borderTop: "1px solid rgba(154,160,162,0.26)" }}>Phase 3</span>
              <span style={{ fontSize: "1rem", lineHeight: "1.72", color: "#9a938d" }}><strong style={{ color: "#c6c4bd", fontWeight: "500" }}>Les postes.</strong> Trois générations plus tard, les archivistes sont devenus des chanceliers, les caravanes exemptées des routes commerciales, et le registre le cadastre. Aucun de ces gens ne se sait au service de l’Arquet.</span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr", gap: "1.3rem", alignItems: "start" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9aa0a2", paddingTop: "0.45rem", borderTop: "1px solid rgba(154,160,162,0.26)" }}>Phase 4</span>
              <span style={{ fontSize: "1rem", lineHeight: "1.72", color: "#9a938d" }}><strong style={{ color: "#c6c4bd", fontWeight: "500" }}>L’inversion.</strong> Le jour où Arkadia a voulu renégocier, elle a découvert que la moitié de son administration devait sa carrière au créancier. Il n’y a pas eu de coup d’État. Il y a eu une réunion, et tout le monde a compris en même temps.</span>
            </li>
          </ol>
          <blockquote style={{ margin: "2.8rem 0 0", borderLeft: "1px solid rgba(154,160,162,0.5)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "clamp(1.18rem,2.4vw,1.45rem)", lineHeight: "1.55", color: "#cbc9c2" }}>Ils n’ont jamais eu besoin d’être aimés ni craints. Ils avaient juste besoin d’être indispensables assez longtemps pour que le retrait devienne impossible.</blockquote>
        </section>

        <section id="strate-4" data-strate="4" data-screen-label="Strate IV — L'Arquet" style={{ position: "relative", width: "100%", maxWidth: "44rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "clamp(1.5rem,7vh,5rem)", left: "-0.06em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(9rem,26vw,20rem)", lineHeight: "0.72", color: "rgba(200,205,212,0.05)", pointerEvents: "none", userSelect: "none" }}>IV</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(200,205,212,0.2)" }}>
            <span style={{ position: "relative", display: "block", width: "1.05rem", height: "1.05rem", border: "1px solid #c8cdd4", flex: "none", transform: "rotate(45deg)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c8cdd4" }}>Strate IV</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(200,205,212,0.18)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,205,212,0.66)", textAlign: "right" }}>An 1800 · L’Arquet</span>
          </div>
          <h2 style={{ margin: "1.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "clamp(1.55rem,3.4vw,2.2rem)", lineHeight: "1.22", letterSpacing: "0.05em", textTransform: "uppercase", color: "#dde1e6" }}>Formalisé, pas fondé</h2>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Astraevor vainc Karn, puis Chronos, puis comprend que le sceau du Mora Miserium est inviolable de l’extérieur, même pour un 4<sup>e</sup> Éveil. Sept sièges, structure fixe, un commanditaire qui n’apparaît jamais. Il a créé la structure. Il a hérité d’un réseau vieux de mille huit cents ans.</p>

          <h3 style={{ margin: "2.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Qui dirige quoi</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Astraevor n’apparaît jamais. Instructions sous forme de rêves, de prémonitions, de parchemins vierges qui ne s’écrivent que sous les yeux des Héritiers. Aucun Héritier ne l’a rencontré plus de deux ou trois fois.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Veyran n’a jamais été le dirigeant et ne le prétend pas. Porte-parole sans magie qui sait tout — parce qu’un porte-parole ignorant est inutile. Sa fonction est héritée de la Maison de Prêt : l’interface légale. Il y a eu des Veyran avant Veyran.</p>

          <h3 style={{ margin: "2.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Ce qui n’est jamais du combat</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(15rem,1fr))", gap: "1.9rem 2.6rem", marginTop: "1.6rem" }}>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>L’économie</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Aurélia achète des rois, finance des guerres, corrompt les institutions. Les Ateliers Prométhéens sont financés par des mécènes qui croient investir dans la médecine avancée, et ils n’ont pas tout à fait tort.</p></div>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Le renseignement</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Soryn dirige les réseaux d’espions. Une organisation dont la cheffe du renseignement peut faire croire à une armée entière qu’elle brûle vive n’a pas besoin d’armée.</p></div>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>La diplomatie</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Khemetra est le modèle : Aurélia tient la source du fleuve, donc le Pharaon obéit. L’Arquet ne renverse jamais un pouvoir — il devient la condition de sa survie.</p></div>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>La collection</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Héritage direct de Vyl. Les journaux de Sylvia, les éclats des dix armes, les livres officiellement détruits par les Académies.</p></div>
          </div>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>L’Ancre</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Ce n’est pas un tatouage. C’est une archive compressée — une masse de mana corrompu et d’informations condensée en une figure sur la peau. L’encre provient de résidus prélevés près des failles de réalité, là où des fragments de la présence conceptuelle de Nihil ont été projetés lors du scellement. La forme s’adapte à l’âme.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>La libération se fait par décompression volontaire : le motif court le long des bras, du torse, du cou, et chaque palier libère plus de données. Yeux qui foncent jusqu’au noir complet, veines visibles suivant le tracé, voix qui descend, pupilles qui cessent de réagir à la lumière. Ce ne sont pas des effets décoratifs — ce sont les symptômes d’un corps qui héberge plus qu’il ne devrait.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(11rem,1fr))", gap: "1.7rem 2.4rem", marginTop: "2.2rem" }}>
            <div><p style={{ margin: "0 0 0.6rem", paddingBottom: "0.45rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Primitive · ~40 %</p><p style={{ margin: "0", fontSize: "0.95rem", lineHeight: "1.62", color: "#8c969b" }}>Exposition directe aux résidus. Amplification incontrôlée, personnalité fragmentée en quelques années.</p></div>
            <div><p style={{ margin: "0 0 0.6rem", paddingBottom: "0.45rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Rituelle · ~60 %</p><p style={{ margin: "0", fontSize: "0.95rem", lineHeight: "1.62", color: "#8c969b" }}>Encre distillée, aiguille d’os sur des points précis. Utilité de dix à vingt ans.</p></div>
            <div><p style={{ margin: "0 0 0.6rem", paddingBottom: "0.45rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Graduée · ~85 %</p><p style={{ margin: "0", fontSize: "0.95rem", lineHeight: "1.62", color: "#8c969b" }}>Eryth. Protocole personnalisé au concept du porteur, paliers de libération contrôlés. Quinze à trente ans.</p></div>
          </div>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Ce qu’Eryth a fait exactement</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Il n’a pas inventé la Marque. Il a compris que la dissolution d’identité n’est pas un effet secondaire, c’est le mécanisme de fonctionnement. L’Ancre se nourrit de l’identité pour produire de la puissance — moins il te reste de toi, plus tu es fort. La Combustion consomme l’enfance, le nom, la raison de se battre, dans cet ordre.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Il ne l’a pas supprimée. Il l’a dosée, avec une logique de gestionnaire de stock : un Marqué qui se vide en trois ans est une ressource gaspillée. Cinquante-trois sujets pour y arriver. Ses deux ajouts décisifs sont des choix de conception, pas des limites techniques — le plafond de verre, jamais de Domaine Absolu ; et le bouton off : Astraevor claque des doigts, la Marque consume son porteur.</p>
          <blockquote style={{ margin: "2.4rem 0 0", borderLeft: "1px solid rgba(200,205,212,0.45)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "clamp(1.05rem,2.2vw,1.28rem)", lineHeight: "1.55", color: "#cfd4da" }}>Il n’a pas rendu la Marque plus puissante. Il l’a rendue sûre pour l’employeur.</blockquote>
          <p style={{ margin: "1.8rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Et à la seconde où l’upgrade a été livré, une vision falsifiée montrée à six Héritiers l’a écarté de son siège. Même la quintessence est consommable. Sauf qu’il a gardé son Ancre, ses sept Ateliers, sa méthode et ses financements — le seul homme au monde qui sache fabriquer l’encre travaille désormais pour lui-même, et personne n’a pensé à ce que ça impliquait.</p>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>L’entrée, et les deux voies</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>On ne reçoit pas la Marque en arrivant : il y a un sas. On commence par être utile sans être marqué. On informe, on transporte, on ouvre des portes. Certains passent toute leur vie à ce niveau et meurent en pensant avoir servi une société commerciale un peu opaque.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(16rem,1fr))", gap: "1.9rem 2.6rem", marginTop: "1.8rem" }}>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>La succession</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Successeurs désignés, formés, qui attendent. La voie propre et patiente — Soryn a succédé à Mystério de cette façon.</p></div>
            <div><p style={{ margin: "0 0 0.7rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Le duel de sang</p><p style={{ margin: "0", fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Tu défies l’Héritier en poste. Si tu gagnes, tu le tues et tu prends sa place. Aucune autorisation à demander, aucune procédure : c’est un droit ouvert à tout Marqué.</p></div>
          </div>
          <p style={{ margin: "1.8rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>La rumeur dit qu’en gagnant un duel de sang, tu n’hérites pas seulement du siège : tu hérites de ses compétences et de son expérience. Un support qui consomme de l’identité pendant des décennies finit par en contenir. <em style={{ color: "#c1c8ce" }}>Ce n’est pas un cadeau. C’est un parasite avec un historique.</em> Tu tues un homme, et pendant les mois qui suivent tu te surprends à connaître le nom de sa mère. Personne n’est sûr, parce que ceux à qui c’est arrivé ne savent plus très bien qui répondrait à la question.</p>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Le vivier</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Chaque Héritier est choisi pour sa brisure particulière, sa douleur utilisable, son désespoir malléable. Ce n’est pas un recrutement de talents, c’est un recrutement de blessures — un mage puissant et stable n’a besoin de personne. Et ils ne promettent jamais de la puissance : ils promettent la chose précise qui manque.</p>
          <ul style={{ margin: "1.8rem 0 0", padding: "0 0 0 1.5rem", listStyle: "none", display: "grid", gap: "0.95rem", borderLeft: "1px solid rgba(200,205,212,0.16)" }}>
            <li style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>L’orphelin qui n’a pas eu la même chance que Léo. Même bâtiment, même vivier, même Église. Personne ne l’a repêché.</li>
            <li style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Un Bora qui a refusé d’avancer. Le même naufrage, la même culpabilité de ne pas être mort, et pas de trois voix pour tenir debout.</li>
            <li style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Une Calista méchante. Le même accès total aux gens — sauf qu’elle s’en est servie.</li>
            <li style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8c969b" }}>Un successeur de Pilier que l’Univers n’a pas choisi.</li>
            <li style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#c1c8ce" }}>Une veuve qui prête sa force pour que ses enfants mangent. Celle-là n’a aucune idéologie. Elle a un loyer.</li>
          </ul>
          <blockquote style={{ margin: "2.4rem 0 0", borderLeft: "1px solid rgba(200,205,212,0.45)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "clamp(1.05rem,2.2vw,1.28rem)", lineHeight: "1.55", color: "#cfd4da" }}>On peut désillusionner un croyant. On ne peut pas désillusionner quelqu’un qui a raison sur les faits.</blockquote>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Les sept sièges actuels</h3>
          <p style={{ margin: "1rem 0 2rem", fontSize: "0.95rem", lineHeight: "1.62", color: "#7d868c" }}>La quintessence — pas les plus puissants au sens brut, mais ceux qui incarnent le mieux ce que l’organisation est.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(13rem,1fr))", gap: "2rem 2.6rem" }}>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·01</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Kael</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>L’Éclipsé · l’Inexistence</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Assassin. Ne se cache pas dans l’ombre : il efface sa présence de la réalité.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·02</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Soryn</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>La Voilée · le Mensonge Incarné</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Dirige les réseaux d’espions. Successeure de Mystério. Elle tient un théâtre.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·03</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Varros</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Le Fléau · la Violence Pure</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Bras gauche entièrement noirci par une Ancre gigantesque. Guerrier pacifiste maudit.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·04</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Aurélia</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Reine Midas · Transmutation</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Trésorière. Elle achète des rois, finance des guerres, corrompt les institutions. A remplacé Eryth.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·05</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Cindrel</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>L’Aède Noir · la Dissonance</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Violon d’os humain. Marque en forme de note barrée.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·06</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Neihem Roshim</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Nécromancie de l’Histoire</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>A repris les Armées après Draeven. La seule armée du monde dont les pertes reviennent au service le lendemain.</p></div>
            <div style={{ position: "relative", border: "1px solid rgba(200,205,212,0.14)", padding: "1.15rem 1.1rem 1.2rem", background: "linear-gradient(180deg, rgba(200,205,212,0.04), rgba(200,205,212,0))" }}><span style={{ position: "absolute", top: "0.55rem", right: "0.7rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(200,205,212,0.32)" }}>VII·07</span><p style={{ margin: "0", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,205,212,0.16)", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", color: "#dde1e6" }}>Malachar</p><p style={{ margin: "0.55rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8cdd4" }}>Siège de Dayu</p><p style={{ margin: "0.5rem 0 0", fontSize: "0.94rem", lineHeight: "1.62", color: "#8c969b" }}>Aucune fonction déclarée à ce jour. La case n’est pas comblée.</p></div>
          </div>
          <p style={{ margin: "2.2rem 0 0", paddingTop: "1.2rem", borderTop: "1px solid rgba(200,205,212,0.14)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.8rem", lineHeight: "1.75", color: "#7d868c" }}>Anciens sièges — Eryth, le Chimiste des Âmes, écarté vivant, remplacé par Aurélia. Draeven, l’Architecte de la Chair, mort, remplacé par Neihem Roshim. Dayu, la Jardinière des Cendres, morte, remplacée par Malachar : la seule à être allée au bout de la libération de sa Marque. Mystério, alias Pether Rudeus, prédécesseur de Soryn, mort contre Elias jeune — et ce duel explique pourquoi Elias médite dix heures par jour.</p>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8cdd4" }}>Lucian</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Il a rejoint l’Arquet, et il n’est pas Marqué — une exception qui n’existe nulle part ailleurs dans la structure. Marquer Lucian reviendrait à le débrancher du siège qu’il doit occuper : quelqu’un dans l’organisation sait exactement ce qu’il est et a donné l’instruction de ne pas y toucher.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8c969b", textWrap: "pretty" }}>Il a vu Celestia de l’intérieur : Sister Mercy brûlée, Darian transformé en fable morale, un orphelinat qui sert de vivier, un enfant de six ans qui reçoit un archange parce qu’il n’y avait personne d’autre. <em style={{ color: "#c1c8ce" }}>Il ne les a pas rejoints par colère — il les a rejoints parce qu’il n’a pas trouvé d’argument.</em></p>
        </section>

        <section id="strate-5" data-strate="5" data-screen-label="Strate V — La main" style={{ position: "relative", width: "100%", maxWidth: "46rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: "clamp(1.5rem,7vh,5rem)", left: "-0.06em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(9rem,26vw,20rem)", lineHeight: "0.72", color: "rgba(200,205,212,0.05)", pointerEvents: "none", userSelect: "none" }}>V</span>
          <div data-fond="3" style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(200,205,212,0.18)" }}>
            <span style={{ display: "flex", gap: "2px", flex: "none", alignItems: "flex-end", height: "1.05rem" }}><span style={{ display: "block", width: "1px", height: "0.6rem", background: "#c8cdd4" }}></span><span style={{ display: "block", width: "1px", height: "0.85rem", background: "#c8cdd4" }}></span><span style={{ display: "block", width: "1px", height: "1.05rem", background: "#c8cdd4" }}></span><span style={{ display: "block", width: "1px", height: "0.85rem", background: "#c8cdd4" }}></span><span style={{ display: "block", width: "1px", height: "0.6rem", background: "#c8cdd4" }}></span></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.34em", textTransform: "uppercase", color: "#c8cdd4" }}>Strate V</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(200,205,212,0.16)" }}></span>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,205,212,0.64)", textAlign: "right" }}>Les Cinq Doigts · les Diplomates</span>
          </div>
          <p style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "0.96rem", color: "rgba(141,149,160,0.85)" }}>Les lettres — l’agrégat de choses non secrètes. Le vrai visage.</p>
          <h2 style={{ margin: "1.8rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "clamp(1.45rem,3.1vw,2rem)", lineHeight: "1.28", letterSpacing: "0.12em", textTransform: "uppercase", color: "#dde1e6" }}>Une main ne frappe pas</h2>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}>Elle tient, elle place, elle ouvre. Et quand elle se ferme, c’est déjà fini. La classe la plus nombreuse de l’Arquet, et la seule qui n’exige ni magie, ni Ancre, ni serment. Des chanceliers, des greffiers, des maîtres de guilde, des recteurs d’université, des juges de paix, des armateurs, des intendants de maison noble.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}>Ils héritent directement de la phase de la Maison de Prêt. Quand on prête à la moitié des royaumes, on finit par former, payer et promouvoir la moitié de leurs administrations. La plupart ne savent pas ce qu’ils servent : ils travaillent pour une maison de commerce ancienne, une fondation, un consortium — des entités parfaitement légales qui existent réellement, paient bien, et n’ont jamais demandé quoi que ce soit d’illégal.</p>
          <blockquote style={{ margin: "2.4rem 0 0", borderLeft: "1px solid rgba(200,205,212,0.4)", padding: "0.2rem 0 0.2rem 1.5rem", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "clamp(1.02rem,2.1vw,1.22rem)", lineHeight: "1.55", color: "#cfd4da" }}>On ne démantèle pas ça. Il n’y a pas de complice à retourner, pas de réseau à décapiter, pas de repaire à fouiller. Il y a un tissu administratif, et retirer le tissu fait s’effondrer les royaumes qui reposent dessus.</blockquote>

          <div style={{ display: "grid", gap: "1.7rem", marginTop: "2.8rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "1.4rem", alignItems: "start", border: "1px solid rgba(200,205,212,0.12)", padding: "1.1rem 1.2rem", background: "linear-gradient(90deg, rgba(200,205,212,0.035), rgba(200,205,212,0))" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8cdd4", paddingTop: "0.45rem", borderTop: "1px solid rgba(200,205,212,0.22)" }}>Le Pouce</span>
              <span style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8d95a0" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>La contrainte.</strong> Il tient les dettes — pas l’argent : qui doit quoi à qui, depuis quand, et ce que ça permet d’exiger. C’est lui qui a fait tomber Arkadia en quatre générations sans un seul coup d’État. Il ne menace jamais. Il rappelle.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "1.4rem", alignItems: "start", border: "1px solid rgba(200,205,212,0.12)", padding: "1.1rem 1.2rem", background: "linear-gradient(90deg, rgba(200,205,212,0.035), rgba(200,205,212,0))" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8cdd4", paddingTop: "0.45rem", borderTop: "1px solid rgba(200,205,212,0.22)" }}>L’Index</span>
              <span style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8d95a0" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>La désignation.</strong> Il pointe. Les apprentis écartés, les enfants aux affinités anormales, les veuves endettées avec un don. Et il tient l’autre liste, celle qui compte : les porteurs de structure d’âme non branchés. Chaque nom dessus est une Ancre à poser avant que l’Univers ne le trouve.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "1.4rem", alignItems: "start", border: "1px solid rgba(200,205,212,0.12)", padding: "1.1rem 1.2rem", background: "linear-gradient(90deg, rgba(200,205,212,0.035), rgba(200,205,212,0))" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8cdd4", paddingTop: "0.45rem", borderTop: "1px solid rgba(200,205,212,0.22)" }}>Le Majeur</span>
              <span style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8d95a0" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>La contradiction.</strong> Le seul dont le métier est de dire non. Une organisation dirigée par un homme qui voit l’avenir a un défaut structurel évident : personne n’ose contredire une prophétie. Il est le seul de la main à pouvoir refuser un ordre venu d’en haut.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "1.4rem", alignItems: "start", border: "1px solid rgba(200,205,212,0.12)", padding: "1.1rem 1.2rem", background: "linear-gradient(90deg, rgba(200,205,212,0.035), rgba(200,205,212,0))" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8cdd4", paddingTop: "0.45rem", borderTop: "1px solid rgba(200,205,212,0.22)" }}>L’Annulaire</span>
              <span style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8d95a0" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>L’alliance.</strong> Mariages, contrats, traités. Le travail le plus lent et le plus rentable : une alliance bien placée produit des résultats sur trois générations. Une part considérable de la noblesse d’Othrys et d’Arkadia lui doit son arbre généalogique sans en avoir la moindre idée.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "9rem 1fr", gap: "1.4rem", alignItems: "start", border: "1px solid rgba(200,205,212,0.12)", padding: "1.1rem 1.2rem", background: "linear-gradient(90deg, rgba(200,205,212,0.035), rgba(200,205,212,0))" }}>
              <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8cdd4", paddingTop: "0.45rem", borderTop: "1px solid rgba(200,205,212,0.22)" }}>L’Auriculaire</span>
              <span style={{ fontSize: "0.98rem", lineHeight: "1.62", color: "#8d95a0" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>L’oubli.</strong> Rapports égarés, témoins réaffectés, dossiers classés, chroniqueurs promus loin. Il ne tue pratiquement jamais — un mort produit une enquête. Il déplace : une carrière brillante offerte à trois cents lieues, une charge honorifique très prenante.</span>
            </div>
          </div>

          <p style={{ margin: "2.6rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}>Ce n’est pas une hiérarchie mais une répartition fonctionnelle. Aucun Doigt ne commande aux autres, et aucun ne connaît l’identité des autres : ils communiquent par relais, par écrits sans signature, par instructions transmises à travers des tiers qui ignorent ce qu’ils portent. Ce n’est pas de la paranoïa, c’est de la continuité — les Cinq Doigts ont survécu à quatre changements de nom de l’organisation.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}>Les Héritiers sont l’outil. Les Diplomates sont l’organisation. Tuer les sept ne ferait pas tomber l’Arquet : ça retirerait sa force de frappe à une structure qui n’en a presque jamais besoin, et qui en formerait sept autres en une génération.</p>
        </section>

        <section data-strate="5" data-screen-label="L'assèchement" style={{ width: "100%", maxWidth: "46rem", padding: "clamp(4rem,12vh,9rem) 0 0" }}>
          <div data-fond="4" style={{ display: "flex", alignItems: "center", gap: "0.9rem", paddingBottom: "0.85rem", borderBottom: "1px solid rgba(200,205,212,0.18)" }}>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.66rem", fontWeight: "500", letterSpacing: "0.34em", textTransform: "uppercase", color: "#c8cdd4" }}>L’assèchement</span>
            <span style={{ flex: "1", height: "1px", background: "rgba(200,205,212,0.16)" }}></span>
            <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(141,149,160,0.8)", textAlign: "right" }}>Le hall — immense, institutionnel, désert.</span>
          </div>
          <p style={{ margin: "1.8rem 0 0", fontSize: "1.02rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>L’Ancre empêche une structure d’âme de se lier à une fonction. Chaque Marqué est une pièce définitivement retirée du stock de l’Univers. Aurélia possède probablement la meilleure affinité Matière vivante du monde — elle est débranchée à vie, et elle ne le sait pas.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.02rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>L’effet n’est pas que les Piliers actuels soient faibles : c’est qu’il devient de plus en plus difficile d’en trouver. Le vivier se raréfie à chaque génération. L’Univers ne se venge pas — il distribue avec ce qui reste.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1.02rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>Et si l’organisation sait cela, alors elle sait que les âmes ont une structure, qu’elles se lient à des fonctions, que les Piliers sont des modules dans un système. Elle a compris la mécanique du monde avant ceux qui l’incarnent. Le vrai but n’a alors pas besoin d’un sabotage : retirer assez de structures suffit à ce que le système s’arrête faute de matériau.</p>

          <h3 style={{ margin: "3.2rem 0 0", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: "500", fontSize: "0.98rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8cdd4" }}>Les deux failles</h3>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>Dans la main.</strong> Personne ne peut vérifier un Doigt, puisque personne ne sait qui il est. Un Doigt qui filtrerait ce qu’il transmet ne serait détecté par personne. Il n’y a pas de contrôle, parce qu’il n’y a jamais eu besoin d’en mettre un.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.58", color: "#8d95a0", textWrap: "pretty" }}><strong style={{ color: "#c1c8ce", fontWeight: "500" }}>Dans les créations.</strong> Les Sujets Nexus ne sont pas des soldats : quatre individus conçus lors d’événements Nexus qu’Astraevor peut prédire des siècles à l’avance. Un Nexus n’amplifie pas que la magie, il amplifie tout, y compris l’âme. Ils ont développé une troisième conscience — et une troisième conscience ne reçoit d’ordres de personne, pas même d’Astraevor. Deux se sont échappés.</p>
        </section>

        <section data-screen-label="La chute" style={{ width: "100%", maxWidth: "44rem", padding: "clamp(6rem,16vh,12rem) 0 0" }}>
          <p style={{ margin: "0", fontSize: "1rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>Vyl a fondé ce réseau pour ramener Klein. Astraevor en a hérité pour libérer Nihil. Les deux objectifs exigent exactement les mêmes moyens.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>Des générations d’Héritiers ont travaillé à la même tâche en croyant servir des causes opposées. L’organisation n’a jamais eu besoin de changer de méthode — seulement de dormeur.</p>
          <p style={{ margin: "1.1rem 0 0", fontSize: "1rem", lineHeight: "1.62", color: "#8d95a0", textWrap: "pretty" }}>Et il reste peut-être, quelque part dans la structure, une vieille lignée qui n’a jamais changé d’objectif et qui attend toujours le retour de l’homme à l’écharpe.</p>
          <p style={{ margin: "3.6rem 0 0", paddingTop: "1.2rem", borderTop: "1px solid rgba(200,205,212,0.12)", fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#7d868c" }}>L’Écho des Cendres — Livre-Monde · Factions</p>
        </section>

      </div>
    </div>
  );
}

export default PalimpsesteFaction;
