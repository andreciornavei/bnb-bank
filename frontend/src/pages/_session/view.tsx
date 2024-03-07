import { Outlet } from 'react-router-dom'
import { SessionPageContext } from './context'
import { AppFrame } from '@components/app-frame'
import { useContextSelector } from 'use-context-selector'
import { CircularProgress, Stack, Typography } from '@mui/material'

export const SessionPageView = (): JSX.Element => {
  const loading = useContextSelector(SessionPageContext, (s) => s.loading)

  if (!!loading) {
    return (
      <AppFrame>
        <Stack flex={1} alignItems="center" justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size={16} thickness={5} />
            <Typography variant="caption" fontWeight="bold">
              Loading BNB Bank...
            </Typography>
          </Stack>
        </Stack>
      </AppFrame>
    )
  }

  return (
    <AppFrame>
      <Outlet />
    </AppFrame>
  )
}
