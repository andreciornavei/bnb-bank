import { Controller } from 'react-hook-form'
import { FormInputTextProps } from './types'
import { TextField, useTheme } from '@mui/material'

export function FormInputText({
  name,
  defaultValue,
  control,
  ...props
}: FormInputTextProps): JSX.Element {
  const { palette } = useTheme()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          inputRef={ref}
          id={name}
          name={name}
          fullWidth
          color="primary"
          variant="standard"
          label={props.label}
          value={value || ''}
          onBlur={onBlur}
          focused
          onChange={(e) => onChange(e)}
          size={props.size || 'small'}
          type={props.type || 'text'}
          defaultValue={defaultValue}
          error={Boolean(props.error)}
          disabled={props.disabled}
          placeholder={props.placeholder}
          helperText={props.error || props.helper}
          FormHelperTextProps={{
            style: {
              color: Boolean(props.error)
                ? palette.error.main
                : palette.primary.main,
            },
          }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: palette.primary.main,
            },
          }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: {
              paddingLeft: 28,
              color: palette.primary.main,
              borderBottomWidth: 1,
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
  )
}
