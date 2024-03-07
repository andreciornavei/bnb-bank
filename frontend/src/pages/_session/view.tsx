import { Outlet } from 'react-router-dom'
import { SessionPageContext } from './context'
import { AppFrame } from '@components/app-frame'
import { LoadingPage } from '@components/loading-page'
import { useContextSelector } from 'use-context-selector'

export const SessionPageView = (): JSX.Element => {
  const loading = useContextSelector(SessionPageContext, (s) => s.loading)

  if (!!loading) {
    return (
      <AppFrame>
        <LoadingPage message="Loading BNB Bank..." />
      </AppFrame>
    )
  }

  return (
    <AppFrame>
      <Outlet />
    </AppFrame>
  )
}
