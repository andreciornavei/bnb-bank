import { LoadingButton } from '@mui/lab'
import { Divider, TextField, styled } from '@mui/material'

export const Container = styled('div')`
  flex: 1;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  backgorund-color: ${({ theme }) => theme.palette.common.white};
`

export const Header = styled('div')`
  height: 20vh;
  min-height: 150px;
  display: flex;
  align-items: end;
  padding-bottom: 32px;
  box-sizing: border-box;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
`

export const Body = styled('form')`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
`

export const FormInput = styled(TextField)`
  min-height: 55px;
  max-height: 55px;
`

export const FormButton = styled(LoadingButton)`
  min-height: 55px;
  max-height: 55px;
`

export const FormDivider = styled(Divider)`
  width: 50px;
  border-bottom-width: 5px;
  margin-top: 24px;
  margin-bottom: 6px;
`
