import { List } from '@mui/material'
import { PrivatePageContext } from '../context'
import { Drawer, DrawerBackground } from '../styles'
import { ItemsRoleSelector } from './items-role-selector'
import { useContextSelector } from 'use-context-selector'
import { SessionPageContext } from '@pages/_session/context'
import { DrawerItem } from '../../../components/drawer-item'
import { DrawerHeader } from '../../../components/drawer-header'

import {
  Bell,
  Gear,
  Question,
  SignOut,
  IdentificationCard,
} from '@phosphor-icons/react'

export const PrivateDrawer = (): JSX.Element => {
  const open = useContextSelector(PrivatePageContext, (s) => s.open)

  const toggleDrawer = useContextSelector(
    PrivatePageContext,
    (s) => s.toggleDrawer
  )

  const leaving = useContextSelector(SessionPageContext, (s) => s.leaving)
  const handleLogout = useContextSelector(
    SessionPageContext,
    (s) => s.handleLogout
  )

  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      anchor="left"
      PaperProps={{
        elevation: 0,
        sx: {
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px !important',
        },
      }}
    >
      <DrawerBackground role="presentation" onClick={() => toggleDrawer(false)}>
        <DrawerHeader />
        <List>
          <ItemsRoleSelector />
          <DrawerItem href="notifications" label="NOTIFICATIONS" icon={Bell} />
          <DrawerItem
            href="profile"
            label="PROFILE"
            icon={IdentificationCard}
          />
          <DrawerItem href="settings" label="SETTINGS" icon={Gear} />
          <DrawerItem href="help" label="HELP" icon={Question} />
          <DrawerItem
            label={leaving ? 'LEAVING...' : 'SIGN OUT'}
            icon={SignOut}
            onClick={handleLogout}
          />
        </List>
      </DrawerBackground>
    </Drawer>
  )
}
