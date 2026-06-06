export type PersonnageTheme = {
  key: string;
  palette: {
    background: string;
    text: string;
    muted: string;
    accent: string;
    surface: string;
    border: string;
  };
  typography?: {
    titleFamily?: string;
    bodyFamily?: string;
    titleWeight?: string;
    titleSpacing?: string;
    bodyLineHeight?: string;
    labelSpacing?: string;
  };
  atmosphere?: {
    backgroundKind?: 'none' | 'mist' | 'embers' | 'void' | 'crystal' | 'stars';
    particleKind?: 'none' | 'ash' | 'embers' | 'dust' | 'stars';
    intensity?: 'low' | 'medium';
  };
};
