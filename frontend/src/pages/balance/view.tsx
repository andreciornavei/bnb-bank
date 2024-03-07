import { Box, Stack, Typography, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { ResumeButton } from '../../components/resume-button'
import { CaretDown, Plus } from '@phosphor-icons/react'

export const BalancePageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column">
      <AppNavbar title="BNB Bank" variant="primary" />
      <ResumeButton
        size="regular"
        resumeLabel="Current Balance"
        resumeValue="$ 6320,00"
        actionLabel="August, 2021"
        color={palette.secondary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <ResumeButton
        size="small"
        href="/deposits/new"
        resumeLabel="Incomes"
        resumeValue="$ 7100,00"
        actionLabel="DEPOSIT A CHECK"
        color={palette.tertiary}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
      <ResumeButton
        size="small"
        href="/purchase"
        resumeLabel="Expensess"
        resumeValue="$ 780,00"
        actionLabel="PURCHASE"
        color={palette.muted}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color={palette.primary.main}>
          TRANSACTIONS
        </Typography>
      </Box>
    </Stack>
  )
}