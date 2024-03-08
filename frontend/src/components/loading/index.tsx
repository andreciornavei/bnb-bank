import { CircularProgress, Stack, Typography } from '@mui/material'
import { LoadingProps } from './types'

export const Loading = ({ message }: LoadingProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CircularProgress size={16} thickness={5} />
      <Typography variant="caption" fontWeight="bold">
        {message || 'Loading...'}
      </Typography>
    </Stack>
  )
}
