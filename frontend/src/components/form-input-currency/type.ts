import {
  FormInputTextSizes,
  FormInputTextTheme,
} from '@components/form-input-text/types'
import { Control, FieldValues } from 'react-hook-form'

type FormInputCurrencyRenderOptionsProps = {
  handleChange: (event: React.FocusEvent<HTMLInputElement, Element>) => void
  handleFocus: () => void
}

export type CurrencyValue = {
  maskedValue: string | undefined
  floatValue: number | undefined
}

export type FormInputCurrencyProps = {
  name: string
  label: string | React.ReactNode
  error?: string
  disabled?: boolean
  helperText?: string
  options?: Object
  size?: FormInputTextSizes
  theme?: FormInputTextTheme
  control: Control<FieldValues, any>
  startAdorment?: React.ReactNode
  endAdorment?: React.ReactNode
  disableUnderline?: boolean
} & Pick<
  FormInputCurrencyControllerProps,
  'prefix' | 'suffix' | 'decimalSeparator' | 'thousandSeparator'
>

export type FormInputCurrencyControllerProps = {
  render: (
    value: string,
    options: FormInputCurrencyRenderOptionsProps
  ) => JSX.Element
  onChange: (value: CurrencyValue) => void
  defaultValue: number
  inputRef: React.MutableRefObject<any>
  decimalSeparator?: '.' | ','
  thousandSeparator?: '.' | ','
  precision?: number
  allowNegative?: boolean
  prefix?: string
  suffix?: string
  selectAllOnFocus?: boolean
  autoFocus?: boolean
}
