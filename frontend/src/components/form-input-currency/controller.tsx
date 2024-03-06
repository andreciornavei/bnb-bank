import React from 'react'
import mask from './mask'
import { FormInputCurrencyControllerProps } from './type'

// IE* parseFloat polyfill
Number.parseFloat = parseFloat

export const FormInputCurrencyController = ({
  render,
  inputRef,
  onChange = () => {},
  defaultValue = 0,
  decimalSeparator = ',',
  thousandSeparator = '.',
  precision = 2,
  allowNegative = false,
  prefix = '',
  suffix = '',
  selectAllOnFocus = true,
}: FormInputCurrencyControllerProps): JSX.Element => {
  const parsedProps = React.useMemo(() => {
    const initialValue = defaultValue.toLocaleString(undefined, {
      style: 'decimal',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })
    const { maskedValue, floatValue } = mask(
      initialValue,
      precision,
      decimalSeparator,
      thousandSeparator,
      allowNegative,
      prefix,
      suffix
    )
    return { maskedValue, floatValue }
  }, [
    defaultValue,
    thousandSeparator,
    decimalSeparator,
    precision,
    allowNegative,
    prefix,
    suffix,
  ])

  const setSelectionRange = (
    node: HTMLInputElement | null,
    start: number,
    end: number
  ) => {
    if (document.activeElement === node) {
      node?.setSelectionRange(start, end)
    }
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault()
    let { maskedValue, floatValue } = mask(
      event.target.value,
      precision,
      decimalSeparator,
      thousandSeparator,
      allowNegative,
      prefix,
      suffix
    )
    event.persist()
    onChange({ maskedValue, floatValue })
  }

  const handleFocus = () => {
    if (!inputRef.current) return
    //Whenever we receive focus check to see if the position is before the suffix, if not, move it.
    let selectionEnd = inputRef.current?.value?.length - suffix.length
    let isNegative =
      (inputRef.current?.value?.match(/-/g) || []).length % 2 === 1
    let selectionStart = prefix.length + (isNegative ? 1 : 0)
    selectAllOnFocus &&
      inputRef.current?.setSelectionRange(selectionStart, selectionEnd)
  }

  React.useEffect(() => {
    let selectionEnd = inputRef.current?.value?.length - suffix.length
    let selectionStart = selectionEnd
    setSelectionRange(inputRef.current, selectionStart, selectionEnd)
  })

  return render(parsedProps.maskedValue, {
    handleChange,
    handleFocus,
  })
}
