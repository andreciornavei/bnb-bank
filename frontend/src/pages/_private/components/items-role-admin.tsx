import { DrawerItem } from '@components/drawer-item'
import { Signature } from '@phosphor-icons/react'

export const ItemsRoleAdmin = (): JSX.Element => {
  return (
    <>
      <DrawerItem href="deposits/control" label="CHECKS" icon={Signature} />
    </>
  )
}
