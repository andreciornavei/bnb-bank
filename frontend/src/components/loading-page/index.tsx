import { Stack } from '@mui/material'
import { Loading } from '@components/loading'
import { LoadingProps } from '@components/loading/types'

export const LoadingPage = (props: LoadingProps): JSX.Element => {
  return (
    <Stack
      flex={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Loading {...props} />
    </Stack>
  )
}
