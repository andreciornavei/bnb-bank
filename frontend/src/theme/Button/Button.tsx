export const Button = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
      disableElevation: true,
      shadow: 'none',
    },
    variants: [
      {
        props: { size: 'tiny' },
        style: {
          height: '26px',
          fontSize: '12px',
          lineHeight: '14px',
          paddingLeft: '0px',
          paddingRight: '0px',
        },
      },
    ],
    styleOverrides: {
      root: {
        borderRadius: 3,
        borderWidth: 1,
        textTransform: 'none',
        boxShadow: 'none',
        //   borderColor: theme.palette.primary.main,
      },
    },
  },
}
