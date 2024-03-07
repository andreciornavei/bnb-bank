import { RoleEnum } from '@enums/role_enum'
import { useAuth } from '@hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoleAdmin = () => {
  const { user } = useAuth()
  if (user?.role !== RoleEnum.admin) return <Navigate to="404" />
  return <Outlet />
}
