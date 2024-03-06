import { Stack, Typography, useTheme } from '@mui/material'
import { FormInputLabelProps } from './types'

export const FormInputLabel = (props: FormInputLabelProps): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {<props.icon weight="duotone" size={21} color={palette.primary.main} />}
      <Typography variant="body1" color={palette.primary.main}>
        {props.label}
      </Typography>
    </Stack>
  )
}
