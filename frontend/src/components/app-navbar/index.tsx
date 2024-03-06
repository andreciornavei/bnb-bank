import { AppNavbarProps } from './types'
import { IconButton } from '@mui/material'
import { List } from '@phosphor-icons/react'
import { NavButton, NavTitle, NavWrapper } from './styles'
import { useContextSelector } from 'use-context-selector'
import { DashboardPageContext } from '@pages/dashboard/context'

export const AppNavbar = ({ title }: AppNavbarProps): JSX.Element => {
  const toggleDrawer = useContextSelector(
    DashboardPageContext,
    (s) => s.toggleDrawer
  )

  return (
    <NavWrapper>
      <NavButton>
        <IconButton onClick={() => toggleDrawer(true)}>
          <List weight="bold" color="white" />
        </IconButton>
      </NavButton>
      <NavTitle>{title}</NavTitle>
    </NavWrapper>
  )
}
