import { ButtonBase, styled } from '@mui/material'

export const FormInputFileWrapper = styled('div')<{
  backgroundImage?: string
}>`
  width: 100%;
  min-height: 140px;
  max-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-color: ${({ theme }) => theme.palette.primary.main};
  background-image: url(${({ backgroundImage }) => backgroundImage});
`

export const FormInputFileSelectable = styled('label')`
  padding: 24px;
  width: 100%;
  min-height: 140px;
  max-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  border-width: 2px;
  border-radius: 6px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.palette.secondary.main};
  background-size: cover;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
`

export const FormInputFileTrash = styled(ButtonBase)`
  top: -20px;
  right: -20px;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.palette.error.main};
`
