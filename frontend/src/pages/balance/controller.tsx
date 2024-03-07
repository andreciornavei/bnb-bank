import { useCallback, useMemo } from 'react'
import { BalancePageContext } from './context'
import { BalancePageControllerProps } from './types'
import { useApi } from '@hooks/api'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'

export const BalancePageController = ({
  children,
}: BalancePageControllerProps): JSX.Element => {
  const api = useApi()
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
        })
    },
    [api]
  )

  const state = useMemo(
    () => ({ handleFindTransactions }),
    [handleFindTransactions]
  )

  return (
    <BalancePageContext.Provider value={state}>
      {children}
    </BalancePageContext.Provider>
  )
}
