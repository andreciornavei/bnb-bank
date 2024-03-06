export const Menu = {
  MuiMenu: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      paper: {
        overflow: 'visible !important',
        marginTop: '12px !important',
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px !important',
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          width: 10,
          height: 10,
          backgroundColor: '#ffffff',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.15)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        height: 25,
        paddingLeft: 12,
        fontSize: '12px !important',
      },
    },
    variants: [
      {
        props: { size: 'medium' },
        style: {},
      },
    ],
  },
}
