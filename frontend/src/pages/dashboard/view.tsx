import { List } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Drawer, DrawerBackground } from './styles'
import { DashboardPageContext } from './context'
import { DrawerItem } from '../../components/drawer-item'
import { useContextSelector } from 'use-context-selector'

import {
  ArrowBendRightDown,
  ArrowBendRightUp,
  Bell,
  Gear,
  IdentificationCard,
  Question,
  Scales,
  SignOut,
  Signature,
} from '@phosphor-icons/react'
import { DrawerHead } from '../../components/drawer-header'

export const DashboardPageView = (): JSX.Element => {
  const open = useContextSelector(DashboardPageContext, (s) => s.open)
  const toggleDrawer = useContextSelector(
    DashboardPageContext,
    (s) => s.toggleDrawer
  )
  return (
    <>
      <Outlet />
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
        <DrawerBackground
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <DrawerHead />
          <List>
            <DrawerItem href="balance" label="BALANCE" icon={Scales} />
            <DrawerItem
              href="incomes"
              label="INCOMES"
              icon={ArrowBendRightUp}
            />
            <DrawerItem
              href="expenses"
              label="EXPENSES"
              icon={ArrowBendRightDown}
            />
            <DrawerItem href="deposits" label="CHECKS" icon={Signature} />
            <DrawerItem
              href="notifications"
              label="NOTIFICATIONS"
              icon={Bell}
            />
            <DrawerItem
              href="profiles"
              label="PROFILE"
              icon={IdentificationCard}
            />
            <DrawerItem href="settings" label="SETTINGS" icon={Gear} />
            <DrawerItem href="help" label="HELP" icon={Question} />
            <DrawerItem href="/" label="SIGN OUT" icon={SignOut} />
          </List>
        </DrawerBackground>
      </Drawer>
    </>
  )
}
