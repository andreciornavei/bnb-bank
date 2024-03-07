import { ButtonBase, styled } from '@mui/material'

export const ResumeButtonWrapper = styled(ButtonBase)<{
  bg: string
}>`
  width: 100%;
  padding: 24px;
  display: block;
  background-color: ${({ bg }) => bg};
`
