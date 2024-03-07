import { Stack } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { DepositsDetailStateSelector } from './components/state_selector'

export const DepositsDetailPageView = (): JSX.Element => {
  return (
    <Stack direction="column" style={{ flex: 1 }}>
      <AppNavbar title="CHECK DETAILS" variant="secondary" />
      <DepositsDetailStateSelector />
    </Stack>
  )
}
