import { Stack, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { CaretDown } from '@phosphor-icons/react'
import { FloatButton } from '@components/float-button'
import { ResumeButton } from '@components/resume-button'

export const DepositsPageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column">
      <AppNavbar title="CHECKS" variant="secondary" />
      <ResumeButton
        size="regular"
        actionLabel="August, 2021"
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/deposits/new" />
    </Stack>
  )
}
