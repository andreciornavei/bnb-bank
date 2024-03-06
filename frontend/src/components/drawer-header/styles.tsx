import { Box, styled } from '@mui/material'

export const DrawerHeadWrapper = styled(Box)`
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`
