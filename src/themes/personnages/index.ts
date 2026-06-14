import type { PersonnageTheme } from '@/types/personnage-theme';
import { defaultPersonnageTheme } from './default';
import { feuTimideTheme } from './feu-timide';
import { videOppressantTheme } from './vide-oppressant';
import { vieSauvageTheme } from './vie-sauvage';

const personnageThemes: Record<string, PersonnageTheme> = {
  [defaultPersonnageTheme.key]: defaultPersonnageTheme,
  [feuTimideTheme.key]: feuTimideTheme,
  [videOppressantTheme.key]: videOppressantTheme,
  [vieSauvageTheme.key]: vieSauvageTheme,
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
