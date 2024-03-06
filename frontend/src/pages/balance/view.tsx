import { Stack, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { ResumeButton } from '../../components/resume-button'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { ArrowDown } from '@phosphor-icons/react'

export const BalancePageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column">
      <AppNavbar title="BNB Bank" />
      <ResumeButton
        size="regular"
        resumeLabel="Current Balance"
        resumeValue="$ 6320,00"
        actionLabel="August, 2021"
        color={palette.secondary}
        actionIcon={ArrowDown}
        actionIconDirection="horizontal"
      />
      <ResumeButton
        size="small"
        resumeLabel="Incomes"
        resumeValue="$ 7100,00"
        actionLabel="DEPOSIT A CHECK"
        color={palette.tertiary}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
      <ResumeButton
        size="small"
        resumeLabel="Expensess"
        resumeValue="$ 780,00"
        actionLabel="PURCHASE"
        color={palette.muted}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
    </Stack>
  )
}
