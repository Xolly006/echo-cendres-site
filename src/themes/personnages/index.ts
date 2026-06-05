import type { PersonnageTheme } from '@/types/personnage-theme';
import { defaultPersonnageTheme } from './default';

const personnageThemes: Record<string, PersonnageTheme> = {
  [defaultPersonnageTheme.key]: defaultPersonnageTheme,
};

export function getPersonnageTheme(themeKey?: string): PersonnageTheme {
  if (!themeKey) return defaultPersonnageTheme;

  const theme = personnageThemes[themeKey];

  if (!theme) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Thème personnage inconnu "${themeKey}". Utilisation du thème "default".`);
    }

    return defaultPersonnageTheme;
  }

  return theme;
}
