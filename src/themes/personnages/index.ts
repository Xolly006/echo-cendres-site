import type { PersonnageTheme } from '@/types/personnage-theme';
import { amourDouleurTheme } from './amour-douleur';
import { defaultPersonnageTheme } from './default';
import { feuTimideTheme } from './feu-timide';
import { masqueVoileTheme } from './masque-voile';
import { orMauditTheme } from './or-maudit';
import { videOppressantTheme } from './vide-oppressant';
import { vieSauvageTheme } from './vie-sauvage';

const personnageThemes: Record<string, PersonnageTheme> = {
  [amourDouleurTheme.key]: amourDouleurTheme,
  [defaultPersonnageTheme.key]: defaultPersonnageTheme,
  [feuTimideTheme.key]: feuTimideTheme,
  [masqueVoileTheme.key]: masqueVoileTheme,
  [orMauditTheme.key]: orMauditTheme,
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
