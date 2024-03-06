import { Icon } from '@phosphor-icons/react'

export type DrawerItemProps = {
  label: string
  icon: Icon
  href?: string
  onClick?: () => void
}
