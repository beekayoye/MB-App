export type ThemeMode = 'system' | 'light' | 'dark';

export interface ColorPalette {
  isDark: boolean;
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceBorder: string;
  inputBackground: string;
  progressBarTrack: string;
  cardCompletedBg: string;
  cardCompletedBorder: string;

  primary: string;
  primaryLight: string;
  primaryDark: string;

  accent: string;
  success: string;
  warning: string;
  danger: string;

  text: string;
  textSecondary: string;
  textMuted: string;

  categories: {
    General: { bg: string; text: string; border: string };
    Work: { bg: string; text: string; border: string };
    Personal: { bg: string; text: string; border: string };
    Shopping: { bg: string; text: string; border: string };
    Health: { bg: string; text: string; border: string };
    Ideas: { bg: string; text: string; border: string };
  };

  priorities: {
    low: { bg: string; text: string; dot: string };
    medium: { bg: string; text: string; dot: string };
    high: { bg: string; text: string; dot: string };
  };
}

export const darkPalette: ColorPalette = {
  isDark: true,
  background: '#0B0F19',
  surface: '#151E30',
  surfaceElevated: '#1E2A42',
  surfaceBorder: '#2A3756',
  inputBackground: '#0F1624',
  progressBarTrack: '#0E1726',
  cardCompletedBg: '#0F1624',
  cardCompletedBorder: '#192235',

  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',

  accent: '#38BDF8',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  categories: {
    General: { bg: '#1E293B', text: '#94A3B8', border: '#334155' },
    Work: { bg: '#1E1B4B', text: '#A5B4FC', border: '#3730A3' },
    Personal: { bg: '#064E3B', text: '#6EE7B7', border: '#047857' },
    Shopping: { bg: '#701A75', text: '#F472B6', border: '#86198F' },
    Health: { bg: '#0C4A6E', text: '#7DD3FC', border: '#0369A1' },
    Ideas: { bg: '#713F12', text: '#FDE047', border: '#854D0E' },
  },

  priorities: {
    low: { bg: '#064E3B22', text: '#34D399', dot: '#10B981' },
    medium: { bg: '#78350F22', text: '#FBBF24', dot: '#F59E0B' },
    high: { bg: '#7F1D1D22', text: '#F87171', dot: '#EF4444' },
  },
};

export const lightPalette: ColorPalette = {
  isDark: false,
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#F1F5F9',
  surfaceBorder: '#E2E8F0',
  inputBackground: '#F8FAFC',
  progressBarTrack: '#E2E8F0',
  cardCompletedBg: '#F8FAFC',
  cardCompletedBorder: '#E2E8F0',

  primary: '#4F46E5',
  primaryLight: '#6366F1',
  primaryDark: '#3730A3',

  accent: '#0284C7',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',

  categories: {
    General: { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' },
    Work: { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
    Personal: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    Shopping: { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' },
    Health: { bg: '#F0F9FF', text: '#0369A1', border: '#BAE6FD' },
    Ideas: { bg: '#FEFCE8', text: '#A16207', border: '#FEF08A' },
  },

  priorities: {
    low: { bg: '#ECFDF5', text: '#059669', dot: '#10B981' },
    medium: { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B' },
    high: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
  },
};

// Default static fallback for convenience
export const Colors = darkPalette;
