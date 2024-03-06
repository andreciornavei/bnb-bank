import { styled, Box, Drawer as MuiDrawer } from '@mui/material'

export const Drawer = styled(MuiDrawer)`
  & > .MuiPaper-root {
    box-shadow: none !important;
  }
`

export const DrawerBackground = styled(Box)`
  width: 100% !important;
  flex: 1;
  max-width: 50% !important;
  min-width: 250px !important;
  background-color: ${({ theme }) => theme.palette.primary.main};
`
