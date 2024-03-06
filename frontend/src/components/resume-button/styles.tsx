import { styled } from '@mui/material'

export const ResumeButtonWrapper = styled('div')<{
  backgroundColor: string
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 24px;
`
