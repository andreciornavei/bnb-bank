import React from 'react'
import { Controller } from 'react-hook-form'
import { FormInputCurrencyProps } from './type'
import { TextField, useTheme } from '@mui/material'
import { FormInputCurrencyController } from './controller'

export const FormInputCurrency = ({
  size = 'medium',
  name,
  control,
  ...props
}: FormInputCurrencyProps): JSX.Element => {
  const { palette } = useTheme()
  const inputRef = React.useRef<any>()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FormInputCurrencyController
          inputRef={inputRef}
          defaultValue={value}
          prefix={props.prefix}
          suffix={props.suffix}
          decimalSeparator={props.decimalSeparator}
          thousandSeparator={props.thousandSeparator}
          onChange={({ floatValue }) => onChange(floatValue || 0)}
          render={(value: string, { handleChange, handleFocus }) => (
            <TextField
              inputRef={ref}
              name={name}
              fullWidth
              type="phone"
              focused
              inputMode="numeric"
              size={size}
              color="primary"
              label={props.label}
              value={value}
              variant="standard"
              onChange={handleChange}
              onFocus={handleFocus}
              onMouseUp={handleFocus}
              onBlur={onBlur}
              disabled={props.disabled}
              error={Boolean(props.error)}
              helperText={props.error || props.helperText}
              FormHelperTextProps={{
                style: {
                  color: Boolean(props.error)
                    ? palette.error.main
                    : palette.primary.main,
                },
              }}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: palette.primary.main,
                },
              }}
              InputProps={{
                style: {
                  padding: 0,
                  borderWidth: 0,
                  outline: 'none',
                  paddingLeft: 28,
                  color: palette.primary.main,
                  borderBottomWidth: props.disableUnderline ? 0 : 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: palette.secondary.main,
                },
                disableUnderline: true,
                startAdornment: props.startAdorment,
                endAdornment: props.endAdorment,
              }}
            />
          )}
        />
      )}
    />
  )
}
