import { formatDate } from '@utils/formatter'
import { Stack, useTheme } from '@mui/material'
import { DepositsPageContext } from './context'
import { FlatList } from '@components/flatlist'
import { CaretDown } from '@phosphor-icons/react'
import { AppNavbar } from '@components/app-navbar'
import { TabFilter } from '@components/tab-filter'
import { FloatButton } from '@components/float-button'
import { SummaryButton } from '@components/summary-button'
import { useContextSelector } from 'use-context-selector'
import { ItemTransaction } from '@components/item-transaction'
import { TransactionEntity } from '@entities/TransactionEntity'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export const DepositsPageView = (): JSX.Element => {
  const { palette } = useTheme()
  const refFlatList = useContextSelector(
    DepositsPageContext,
    (s) => s.refFlatList
  )
  const handleFindTransactions = useContextSelector(
    DepositsPageContext,
    (s) => s.handleFindTransactions
  )
  return (
    <Stack direction="column" flex={1}>
      <AppNavbar title="CHECKS" variant="secondary" />
      <SummaryButton
        size="regular"
        actionLabel={formatDate(new Date())}
        color={palette.tertiary}
        actionIcon={CaretDown}
        actionIconDirection="horizontal"
      />
      <FloatButton href="/deposits/new" />
      <TabFilter
        qsName="status"
        tabs={[
          { key: TransactionStatusEnum.pending, label: 'PENDING' },
          { key: TransactionStatusEnum.approved, label: 'ACCEPTED' },
          { key: TransactionStatusEnum.rejected, label: 'REJECTED' },
        ]}
      />
      <Stack pt={2} pb={13} flex={1}>
        <FlatList
          rowSpacing={0}
          ref={refFlatList}
          emptyMessage="No checks to show"
          loadingMessage="Loading Checks..."
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
