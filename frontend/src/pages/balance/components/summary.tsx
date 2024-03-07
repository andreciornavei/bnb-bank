import { Plus } from '@phosphor-icons/react'
import { Stack, useTheme } from '@mui/material'
import { BalancePageContext } from '../context'
import { useContextSelector } from 'use-context-selector'
import { SummaryButton } from '@components/summary-button'
import { formatAmount } from '@utils/formatter'

export const BalanceSummary = (): JSX.Element => {
  const { palette } = useTheme()
  const summary = useContextSelector(BalancePageContext, (s) => s.summary)
  const loadingSymmary = useContextSelector(
    BalancePageContext,
    (s) => s.loadingSummary
  )
  return (
    <Stack>
      <SummaryButton
        size="small"
        href="/deposits/new"
        summaryLabel="Incomes"
        summaryValue={
          loadingSymmary ? 'Loading...' : formatAmount(summary?.incomes || 0)
        }
        actionLabel="DEPOSIT A CHECK"
        color={palette.tertiary}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
      <SummaryButton
        size="small"
        href="/purchase"
        summaryLabel="Expensess"
        summaryValue={
          loadingSymmary ? 'Loading...' : formatAmount(summary?.expenses || 0)
        }
        actionLabel="PURCHASE"
        color={palette.muted}
        actionIcon={Plus}
        actionIconDirection="vertical"
      />
    </Stack>
  )
}
