import { useApi } from '@hooks/api'
import { DepositsPageContext } from './context'
import { useCallback, useMemo, useRef } from 'react'
import { useQueryParam } from '@hooks/useQueryParam'
import { DepositsPageControllerProps } from './types'
import { FlatListRefType } from '@components/flatlist/types'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'
import { TransactionFactorEnum } from '@enums/transaction_factor_enum'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export const DepositsPageController = ({
  children,
}: DepositsPageControllerProps): JSX.Element => {
  const api = useApi()
  const refFlatList = useRef<FlatListRefType>(null)

  useQueryParam('status', (value) => {
    console.log('status updated to', value)
    refFlatList.current?.refresh({ status: value })
  })

  const handleFindTransactions = useCallback(
    (
      limit: number,
      cursor: string | undefined,
      filters: Record<string, string> | undefined
    ) => {
      return api
        .instanceOf<TransactionsCustomerApi>(TransactionsCustomerApi)
        .list({
          limit: limit,
          cursor: cursor,
          status: filters?.status
            ? ([filters?.status] as TransactionStatusEnum[])
            : [TransactionStatusEnum.pending],
          factor: TransactionFactorEnum.deposit,
        })
    },
    [api]
  )

  const state = useMemo(
    () => ({ refFlatList, handleFindTransactions }),
    [refFlatList, handleFindTransactions]
  )
  return (
    <DepositsPageContext.Provider value={state}>
      {children}
    </DepositsPageContext.Provider>
  )
}
