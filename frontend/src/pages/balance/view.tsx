import { useAuth } from '@hooks/auth'
import { BalancePageContext } from './context'
import { FlatList } from '@components/flatlist'
import { AppNavbar } from '@components/app-navbar'
import { CaretDown } from '@phosphor-icons/react'
import { useContextSelector } from 'use-context-selector'
import { formatAmount, formatDate } from '@utils/formatter'
import { SummaryButton } from '../../components/summary-button'
import { ItemTransaction } from '@components/item-transaction'
import { TransactionEntity } from '@entities/TransactionEntity'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { BalanceSummary } from './components/summary'

export const BalancePageView = (): JSX.Element => {
  const { user } = useAuth()
  const { palette } = useTheme()
  const handleFindTransactions = useContextSelector(
    BalancePageContext,
    (s) => s.handleFindTransactions
  )
  return (
    <Stack direction="column" flex={1}>
      <AppNavbar title="BNB Bank" variant="primary" />
      <SummaryButton
        size="regular"
        summaryLabel="Current Balance"
        summaryValue={formatAmount(user?.balance || 0)}
        actionLabel={formatDate(new Date())}
        color={palette.secondary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <BalanceSummary />
      <Box sx={{ pt: 3, px: 3, pb: 1 }}>
        <Typography variant="body1" color={palette.primary.main}>
          TRANSACTIONS
        </Typography>
      </Box>
      <Stack pb={3} flex={1}>
        <FlatList
          rowSpacing={0}
          loadingMessage="Loading transactions..."
          emptyMessage="No expenses to show"
          itemKey={(item: TransactionEntity) => item._id}
          renderItem={(item: TransactionEntity) => (
            <ItemTransaction data={item} />
          )}
          handleFetch={handleFindTransactions}
        />
      </Stack>
    </Stack>
  )
}
