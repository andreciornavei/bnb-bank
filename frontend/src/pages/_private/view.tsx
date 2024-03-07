import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@hooks/auth'
import { PrivateDrawer } from './components/private-drawer'

export const PrivatePageView = (): JSX.Element => {
  const auth = useAuth()

  if (!auth.user) return <Navigate to="/" replace />

  return (
    <>
      <Outlet />
      <PrivateDrawer />
    </>
  )
}
