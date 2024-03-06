export const TextField = {
  MuiInputBase: {
    defaultProps: {},
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
        props: { size: 'tiny' },
        style: {
          fontSize: 11,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          backgroundColor: 'transparent',
          height: 25,
        },
      },
    ],
  },
  MuiTextField: {
    defaultProps: {},
    variants: [
      { props: { size: 'small' }, style: { backgroundColor: 'transparent' } },
    ],
  },
  MuiFormControl: {
    defaultProps: {},
    variants: [{ props: { size: 'small' } }],
  },
  MuiInputLabel: {
    variants: [
      {
        props: { size: 'small' },
        style: { fontSize: '14px', top: -1 },
        styleOverrides: {
          shrink: ({ ownerState }) => ({
            ...(ownerState.shrink && {
              top: '1px !important',
            }),
          }),
        },
      },
      {
        props: { size: 'tiny' },
        style: { fontSize: '12px', top: -1 },
      },
    ],
    styleOverrides: {
      shrink: ({ ownerState }) => ({
        ...(ownerState.shrink && {
          top: '2px !important',
        }),
      }),
    },
  },
}
