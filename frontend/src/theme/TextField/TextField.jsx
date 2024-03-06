import { theme } from '@theme/theme'

export const TextField = {
  MuiInputBase: {
    defaultProps: {},
    styleOverrides: { root: { color: theme.palette.primary.main } },
    variants: [
      {
        props: { size: 'small' },
        style: {
          fontSize: 14,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          backgroundColor: 'transparent',
          height: 36,
        },
      },
      {
        props: { size: 'large' },
        style: {
          fontSize: 24,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          backgroundColor: 'transparent',
          height: 55,
        },
      },
    ],
  },
  MuiTextField: {
    defaultProps: {},
    styleOverrides: {},
    variants: [
      { props: { size: 'small' }, style: { backgroundColor: 'transparent' } },
    ],
  },
  MuiFormControl: {
    defaultProps: {},
    styleOverrides: {},
    variants: [{ props: { size: 'small' } }],
  },
  MuiInputLabel: {
    defaultProps: {},
    styleOverrides: { root: { color: theme.palette.primary.main } },
    variants: [
      {
        props: { size: 'small' },
        style: { fontSize: '14px', top: -1 },
      },
      {
        props: { size: 'large' },
        style: { fontSize: '16px' },
      },
    ],
  },
}
