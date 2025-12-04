import { StyleSheet } from 'react-native-unistyles'

const colors = {
  transparent: 'rgba(0, 0, 0, 0)',
  white: '#ffffff',
  black: '#000000',

  primary: {
    50:  '#ECF3FB',
    100: '#DAE7F7',
    300: '#8BB8E6',
    500: '#018CD5',
    600: '#186EA6',
  },
  neutral: {
    0:   '#ECF3FB',
    20:  '#F4F5F6',
    50:  '#E3E5E8',
    100: '#C8CCD1',
    200: '#949BA5',
    300: '#626D7B',
    400: '#334354',
    500: '#041D30',
  },
  success: {
    100: '#D0E7D9',
    200: '#A1D0B4',
    300: '#73B88E',
    400: '#44A169',
    500: '#158943',
  },
  error: {
    100: '#EDCFCF',
    200: '#DAA0A0',
    300: '#C87070',
    400: '#B54141',
    500: '#A31111',
  },
  warning: {
    50:  '#FBEBCF',
    100: '#FBD4A4',
    500: '#EB8602',
  }
} as const;

const fontFamily = {
  regular: 'FormularNeutral-Regular',
  medium: 'FormularNeutral-Medium',
  bold: 'FormularNeutral-Bold',
} as const

type FontWeightKey = '400' | '500'

const assocFontWeight: Record<FontWeightKey, string> = {
  '400': fontFamily.regular,
  '500': fontFamily.medium,
}

const fonts = {
  s10w400: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '400' as const,
    fontFamily: assocFontWeight['400'],
  },
  s11w400: {
    fontSize: 11,
    lineHeight: 14.3,
    fontWeight: '400' as const,
    fontFamily: assocFontWeight['400'],
  },
  s12w400: {
    fontSize: 12,
    lineHeight: 15.6,
    fontWeight: '400' as const,
    fontFamily: assocFontWeight['400'],
  },
  s12w500: {
    fontSize: 12,
    lineHeight: 15.6,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
  s14w400: {
    fontSize: 14,
    lineHeight: 18.2,
    fontWeight: '400' as const,
    fontFamily: assocFontWeight['400'],
  },
  s14w500: {
    fontSize: 14,
    lineHeight: 18.2,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
  s16w400: {
    fontSize: 16,
    lineHeight: 20.8,
    fontWeight: '400' as const,
    fontFamily: assocFontWeight['400'],
  },
  s16w500: {
    fontSize: 16,
    lineHeight: 20.8,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
  s18w500: {
    fontSize: 18,
    lineHeight: 23.4,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
  s22w500: {
    fontSize: 22,
    lineHeight: 28.6,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
  s32w500: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: '500' as const,
    fontFamily: assocFontWeight['500'],
  },
} as const

export type FontKey = keyof typeof fonts;

const paddings = {
  screenHorizontal: 16
} as const;

const lightTheme = {
  colors,
  fonts,
  paddings,
}

const appThemes = {
  common: lightTheme,
}

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'common',
  },
  breakpoints,
  themes: appThemes
})