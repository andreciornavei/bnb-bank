import { DrawerItem } from '@components/drawer-item'
import {
  ArrowBendRightDown,
  ArrowBendRightUp,
  Scales,
  Signature,
} from '@phosphor-icons/react'

export const ItemsRoleCustomer = (): JSX.Element => {
  return (
    <>
      <DrawerItem href="balance" label="BALANCE" icon={Scales} />
      <DrawerItem href="incomes" label="INCOMES" icon={ArrowBendRightUp} />
      <DrawerItem href="expenses" label="EXPENSES" icon={ArrowBendRightDown} />
      <DrawerItem href="deposits" label="CHECKS" icon={Signature} />
    </>
  )
}
