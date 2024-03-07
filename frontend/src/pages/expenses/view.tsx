import { Stack, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { ResumeButton } from '@components/resume-button'
import { CaretDown } from '@phosphor-icons/react'
import { FloatButton } from '@components/float-button'
import { formatDate } from '@utils/formatter'

export const ExpensesPageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column">
      <AppNavbar title="EXPENSES" variant="secondary" />
      <ResumeButton
        size="regular"
        actionLabel={formatDate(new Date())}
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/purchase" />
    </Stack>
  )
}
