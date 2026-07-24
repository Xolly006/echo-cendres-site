import styles from './CagePersonnage.module.css';

/**
 * La Roue de Feu.
 *
 * "Des roues de feu imbriquées, des milliers d'yeux, des ailes géométriques
 *  faites de lumière dure." — "une roue de feu de la taille d'une ville."
 *
 * Trois partis pris tirés directement de ces lignes :
 *
 * 1. TROP GRANDE POUR LE CADRE. Le viewBox est volontairement débordé : on
 *    n'en voit qu'un arc, coupé par les bords de l'écran, et l'on devine
 *    qu'elle continue au-delà. Une roue entière et centrée serait un logo ;
 *    un fragment qui déborde est une présence.
 *
 * 2. IMBRIQUÉE. Plusieurs cercles décalés les uns des autres, jamais
 *    parfaitement concentriques, tournant à des vitesses différentes et
 *    toujours en `linear` : l'easing est une hésitation, il n'en a pas.
 *
 * 3. COUVERTE D'YEUX. Ils ne s'ouvrent jamais tous en même temps. Ils sont
 *    fins, dorés, disséminés dans la géométrie — et l'un d'eux au moins est
 *    toujours ouvert.
 *
 * "Trop grande, trop fondamentale pour que les sens humains la traitent
 *  sans dommages" : la roue est en arrière-plan et ne capte jamais le
 *  pointeur. On ne la fixe pas, on la subit.
 */

const RINGS = [
  { r: 300, dash: '2 26', cx: 0, cy: 0, duration: '210s', reverse: false, width: 1.4 },
  { r: 236, dash: '54 18 6 18', cx: 22, cy: -14, duration: '150s', reverse: true, width: 1 },
  { r: 178, dash: '1 14', cx: -18, cy: 10, duration: '96s', reverse: false, width: 1.2 },
  { r: 122, dash: '38 12', cx: 8, cy: 18, duration: '64s', reverse: true, width: 1 },
];

// Positions fixes : une répartition aléatoire changerait à chaque rendu et
// provoquerait une divergence d'hydratation.
const EYES = [
  { x: 0, y: -286, s: 1, d: '0s' },
  { x: 214, y: -186, s: 0.8, d: '2.4s' },
  { x: 288, y: 46, s: 1.1, d: '5.1s' },
  { x: 148, y: 232, s: 0.75, d: '7.8s' },
  { x: -96, y: 268, s: 0.9, d: '3.6s' },
  { x: -256, y: 118, s: 1, d: '9.2s' },
  { x: -268, y: -112, s: 0.7, d: '6.3s' },
  { x: -120, y: -236, s: 0.85, d: '11.4s' },
  { x: 96, y: -142, s: 0.65, d: '8.1s' },
  { x: 166, y: 92, s: 0.7, d: '4.7s' },
  { x: -142, y: 44, s: 0.6, d: '10.6s' },
  { x: 24, y: 168, s: 0.65, d: '1.8s' },
];

export function RoueDeFeu() {
  return (
    <div className={styles.roue} aria-hidden="true">
      <svg viewBox="-320 -320 640 640" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <radialGradient id="roue-braise" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="var(--character-accent)" stopOpacity="0" />
            <stop offset="82%" stopColor="var(--character-accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--character-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r="300" fill="url(#roue-braise)" />

        {RINGS.map((ring, index) => (
          <g
            key={ring.r}
            className={styles.roueAnneau}
            style={{
              // Chaque anneau tourne à son propre rythme : imbriqués, jamais
              // synchrones. Toujours linear.
              animationDuration: ring.duration,
              animationDirection: ring.reverse ? 'reverse' : 'normal',
            }}
          >
            <circle
              cx={ring.cx}
              cy={ring.cy}
              r={ring.r}
              fill="none"
              stroke="var(--character-accent)"
              strokeWidth={ring.width}
              strokeDasharray={ring.dash}
              opacity={0.72 - index * 0.09}
            />
          </g>
        ))}

        {/* Ailes géométriques de lumière dure : des cordes, pas des courbes. */}
        <g className={styles.roueCordes}>
          <polygon
            points="0,-300 260,150 -260,150"
            fill="none"
            stroke="var(--character-accent)"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <polygon
            points="0,300 260,-150 -260,-150"
            fill="none"
            stroke="var(--character-accent)"
            strokeWidth="0.8"
            opacity="0.3"
          />
        </g>

        <g className={styles.roueYeux}>
          {EYES.map((eye) => (
            <g
              key={`${eye.x}-${eye.y}`}
              transform={`translate(${eye.x} ${eye.y}) scale(${eye.s})`}
              style={{ animationDelay: eye.d }}
            >
              <path
                d="M -13 0 Q 0 -9 13 0 Q 0 9 -13 0 Z"
                fill="none"
                stroke="var(--character-accent)"
                strokeWidth="1.1"
              />
              <circle cx="0" cy="0" r="3.1" fill="var(--character-accent)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
