export const Button = {
  MuiButton: {
    defaultProps: {
      shadow: 'none',
      disableRipple: true,
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderWidth: 1,
        borderRadius: 3,
        boxShadow: 'none',
        textTransform: 'none',
      },
    },
  },
}
