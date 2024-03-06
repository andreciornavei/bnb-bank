import { Outlet } from 'react-router-dom'
import { SessionPageContext } from './context'
import { LinearProgress } from '@mui/material'
import { AppFrame } from '@components/app-frame'
import { useContextSelector } from 'use-context-selector'

export const SessionPageView = (): JSX.Element => {
  const loading = useContextSelector(SessionPageContext, (s) => s.loading)

  if (!!loading) {
    return (
      <AppFrame>
        <LinearProgress />
      </AppFrame>
    )
  }

  return (
    <AppFrame>
      <Outlet />
    </AppFrame>
  )
}
