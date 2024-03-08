import { Stack, useTheme } from '@mui/material'
import { formatDate } from '@utils/formatter'
import { IncomesPageContext } from './context'
import { FlatList } from '@components/flatlist'
import { CaretDown } from '@phosphor-icons/react'
import { AppNavbar } from '@components/app-navbar'
import { FloatButton } from '@components/float-button'
import { SummaryButton } from '@components/summary-button'
import { useContextSelector } from 'use-context-selector'
import { TransactionEntity } from '@entities/TransactionEntity'
import { ItemTransaction } from '@components/item-transaction'

export const IncomesPageView = (): JSX.Element => {
  const { palette } = useTheme()
  const handleFindTransactions = useContextSelector(
    IncomesPageContext,
    (s) => s.handleFindTransactions
  )
  return (
    <Stack direction="column" flex={1} position="relative">
      <AppNavbar title="INCOMES" variant="secondary" />
      <SummaryButton
        size="regular"
        actionLabel={formatDate(new Date())}
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/deposits/new" />
      <Stack pt={2} pb={13} flex={1}>
        <FlatList
          rowSpacing={0}
          emptyMessage="No incomes to show"
          loadingMessage="Loading incomes..."
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
