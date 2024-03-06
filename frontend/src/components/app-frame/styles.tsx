import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100%;
  background-color: ${({ theme }) => `${theme.palette.common.white}`};
  border-color: ${({ theme }) => `${theme.palette.grey[300]}`};
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-style: solid;
`
