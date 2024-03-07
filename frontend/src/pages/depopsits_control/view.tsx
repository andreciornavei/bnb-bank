import { Stack } from '@mui/material'
import { FlatList } from '@components/flatlist'
import { AppNavbar } from '@components/app-navbar'
import { DepositsControlPageContext } from './context'
import { useContextSelector } from 'use-context-selector'
import { ItemTransaction } from '@components/item-transaction'
import { TransactionEntity } from '@entities/TransactionEntity'

export const DepositsControlPageView = (): JSX.Element => {
  const handleFindTransactions = useContextSelector(
    DepositsControlPageContext,
    (s) => s.handleFindTransactions
  )
  return (
    <Stack direction="column" flex={1}>
      <AppNavbar title="CHECKS CONTROL" variant="secondary" />
      <Stack pt={2} pb={13} flex={1}>
        <FlatList
          rowSpacing={0}
          emptyMessage="There is no pending checks to show, wait for new customer deposit requests."
          loadingMessage="Loading pending checks..."
          itemKey={(item: TransactionEntity) => item._id}
          renderItem={(item: TransactionEntity) => (
            <ItemTransaction data={item} href={`/deposits/${item._id}`} />
          )}
          handleFetch={handleFindTransactions}
        />
      </Stack>
    </Stack>
  )
}
