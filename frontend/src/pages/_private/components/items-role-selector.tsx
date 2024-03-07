import { useAuth } from '@hooks/auth'
import { RoleEnum } from '@enums/role_enum'
import { ItemsRoleAdmin } from './items-role-admin'
import { ItemsRoleCustomer } from './items-role-customer'

export const ItemsRoleSelector = (): JSX.Element | null => {
  const { user } = useAuth()
  if (user?.role === RoleEnum.admin) return <ItemsRoleAdmin />
  if (user?.role === RoleEnum.customer) return <ItemsRoleCustomer />
  return null
}
