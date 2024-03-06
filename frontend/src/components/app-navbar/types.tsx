import { theme } from '@theme/theme'

export type AppNavbarVariantType = 'primary' | 'secondary'

export type AppNavbarVariantProps = {
  foregroundColor: string
  backgroundColor: string
  titleSize: 'body1' | 'body2'
}

export const AppNavbarVariantMap: Record<
  AppNavbarVariantType,
  AppNavbarVariantProps
> = {
  primary: {
    backgroundColor: theme.palette.secondary.main,
    foregroundColor: theme.palette.common.white,
    titleSize: 'body1',
  },
  secondary: {
    backgroundColor: theme.palette.tertiary.main,
    foregroundColor: theme.palette.primary.main,
    titleSize: 'body2',
  },
}

export type AppNavbarProps = {
  title: string
  variant: AppNavbarVariantType
  hideDrawerButton?: boolean
}
