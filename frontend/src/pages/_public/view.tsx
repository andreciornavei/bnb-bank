import { useAuth } from '@hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicPageView = (): JSX.Element => {
  const auth = useAuth()
  if (!!auth.user) return <Navigate to="/balance" replace />
  return <Outlet />
}
