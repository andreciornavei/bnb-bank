import { ButtonBase, styled } from '@mui/material'

export const SummaryButtonWrapper = styled(ButtonBase)<{
  bg: string
}>`
  width: 100%;
  padding: 24px;
  display: block;
  background-color: ${({ bg }) => bg};
`
