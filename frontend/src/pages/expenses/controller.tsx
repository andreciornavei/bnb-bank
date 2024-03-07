import { useApi } from '@hooks/api'
import { useCallback, useMemo } from 'react'
import { ExpensesPageContext } from './context'
import { ExpensesPageControllerProps } from './types'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'
import { TransactionFactorEnum } from '@enums/transaction_factor_enum'

export const ExpensesPageController = ({
  children,
}: ExpensesPageControllerProps): JSX.Element => {
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
          factor: TransactionFactorEnum.expense,
        })
    },
    [api]
  )

  const state = useMemo(
    () => ({ handleFindTransactions }),
    [handleFindTransactions]
  )
  return (
    <ExpensesPageContext.Provider value={state}>
      {children}
    </ExpensesPageContext.Provider>
  )
}
