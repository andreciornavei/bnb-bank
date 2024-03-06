import { Typography, TypographyProps, styled } from '@mui/material'

export const NavWrapper = styled('div')`
  display: flex;
  min-height: 65px;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`

export const NavTitle = styled((props: TypographyProps) => (
  <Typography {...props} variant="body1" />
))`
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`

export const NavButton = styled('div')`
  left: 0px;
  top: 0px;
  position: absolute;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
`
