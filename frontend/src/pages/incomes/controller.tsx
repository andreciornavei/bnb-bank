import { useApi } from '@hooks/api'
import { useCallback, useMemo } from 'react'
import { IncomesPageContext } from './context'
import { IncomesPageControllerProps } from './types'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'
import { TransactionFactorEnum } from '@enums/transaction_factor_enum'

export const IncomesPageController = ({
  children,
}: IncomesPageControllerProps): JSX.Element => {
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
          factor: TransactionFactorEnum.deposit,
        })
    },
    [api]
  )

  const state = useMemo(
    () => ({ handleFindTransactions }),
    [handleFindTransactions]
  )
  return (
    <IncomesPageContext.Provider value={state}>
      {children}
    </IncomesPageContext.Provider>
  )
}
