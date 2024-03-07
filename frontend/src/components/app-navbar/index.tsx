import { List } from '@phosphor-icons/react'
import { NavButton, NavWrapper } from './styles'
import { IconButton, Typography } from '@mui/material'
import { useContextSelector } from 'use-context-selector'
import { PrivatePageContext } from '@pages/_private/context'
import { AppNavbarProps, AppNavbarVariantMap } from './types'

export const AppNavbar = ({ title, variant }: AppNavbarProps): JSX.Element => {
  const toggleDrawer = useContextSelector(
    PrivatePageContext,
    (s) => s.toggleDrawer
  )

  return (
    <NavWrapper
      sx={{ backgroundColor: AppNavbarVariantMap[variant].backgroundColor }}
    >
      <NavButton>
        <IconButton onClick={() => toggleDrawer(true)}>
          <List
            weight="bold"
            color={AppNavbarVariantMap[variant].foregroundColor}
          />
        </IconButton>
      </NavButton>
      <Typography
        fontWeight="bold"
        variant={AppNavbarVariantMap[variant].titleSize}
        color={AppNavbarVariantMap[variant].foregroundColor}
      >
        {title}
      </Typography>
    </NavWrapper>
  )
}
