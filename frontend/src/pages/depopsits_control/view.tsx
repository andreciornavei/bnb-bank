import { Stack } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'

export const DepositsControlPageView = (): JSX.Element => {
  return (
    <Stack direction="column">
      <AppNavbar title="CHECKS CONTROL" variant="secondary" />
    </Stack>
  )
}
