import { Stack, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { ResumeButton } from '@components/resume-button'
import { CaretDown } from '@phosphor-icons/react'
import { FloatButton } from '@components/float-button'

export const ExpensesPageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column">
      <AppNavbar title="EXPENSES" variant="secondary" />
      <ResumeButton
        size="regular"
        actionLabel="August, 2021"
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/purchase" />
    </Stack>
  )
}
