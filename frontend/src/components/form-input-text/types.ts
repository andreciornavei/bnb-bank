import { SxProps, Theme } from '@mui/material'
import { Control, FieldValues } from 'react-hook-form'

export type FormInputTextSizes = 'large' | 'medium' | 'small'
export type FormInputTextTheme = 'dark' | 'light'

export type FormInputTextProps = {
  name: string
  label?: string | React.ReactNode
  error?: string
  helper?: string
  disabled?: boolean
  theme?: FormInputTextTheme
  size?: FormInputTextSizes
  type?: React.InputHTMLAttributes<unknown>['type']
  defaultValue?: any
  fullWidth?: boolean
  placeholder?: string
  startAdorment?: React.ReactNode
  endAdorment?: React.ReactNode
  control: Control<FieldValues, any>
  inputStyle?: SxProps<Theme> | undefined
  disableUnderline?: boolean
}
