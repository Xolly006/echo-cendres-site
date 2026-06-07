import type { PersonnageTheme } from '@/types/personnage-theme';
import styles from './PersonnageAtmosphere.module.css';

type PersonnageAtmosphereProps = {
  atmosphere?: PersonnageTheme['atmosphere'];
};

export function PersonnageAtmosphere({ atmosphere }: PersonnageAtmosphereProps) {
  const backgroundKind = atmosphere?.backgroundKind ?? 'none';
  const particleKind = atmosphere?.particleKind ?? 'none';
  const intensity = atmosphere?.intensity ?? 'low';

  if (backgroundKind === 'none' && particleKind === 'none') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={styles.atmosphere}
      data-background-kind={backgroundKind}
      data-intensity={intensity}
      data-particle-kind={particleKind}
    >
      <span className={styles.depth} />
      <span className={styles.localGlow} />
      <span className={styles.farGlow} />
      <span className={styles.traceOne} />
      <span className={styles.traceTwo} />
      <span className={styles.grain} />
    </div>
  );
}
