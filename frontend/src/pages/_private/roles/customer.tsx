import { RoleEnum } from '@enums/role_enum'
import { useAuth } from '@hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoleCustomer = () => {
  const { user } = useAuth()
  if (user?.role !== RoleEnum.customer) return <Navigate to="404" />
  return <Outlet />
}
