import { CircularProgress, Stack, Typography } from '@mui/material'
import { LoadingPageProps } from './types'

export const LoadingPage = ({ message }: LoadingPageProps): JSX.Element => {
  return (
    <Stack
      flex={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress size={16} thickness={5} />
        <Typography variant="caption" fontWeight="bold">
          {message || 'Loading...'}
        </Typography>
      </Stack>
    </Stack>
  )
}
