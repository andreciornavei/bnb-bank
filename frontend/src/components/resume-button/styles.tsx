import { ButtonBase, styled } from '@mui/material'

export const ResumeButtonWrapper = styled(ButtonBase)<{
  backgroundColor: string
}>`
  width: 100%;
  padding: 24px;
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
