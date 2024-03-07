import { Stack, useTheme } from '@mui/material'
import { formatDate } from '@utils/formatter'
import { ExpensesPageContext } from './context'
import { FlatList } from '@components/flatlist'
import { CaretDown } from '@phosphor-icons/react'
import { AppNavbar } from '@components/app-navbar'
import { FloatButton } from '@components/float-button'
import { ResumeButton } from '@components/resume-button'
import { useContextSelector } from 'use-context-selector'
import { TransactionEntity } from '@entities/TransactionEntity'
import { ItemTransaction } from '@components/item-transaction'

export const ExpensesPageView = (): JSX.Element => {
  const { palette } = useTheme()
  const handleFindTransactions = useContextSelector(
    ExpensesPageContext,
    (s) => s.handleFindTransactions
  )
  return (
    <Stack direction="column" flex={1} position="relative">
      <AppNavbar title="EXPENSES" variant="secondary" />
      <ResumeButton
        size="regular"
        actionLabel={formatDate(new Date())}
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/purchase" />
      <Stack pt={2} pb={13} flex={1}>
        <FlatList
          rowSpacing={0}
          emptyMessage="No expenses to show"
          loadingMessage="Loading expenses..."
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
