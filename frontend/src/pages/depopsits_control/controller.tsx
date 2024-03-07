import { useCallback, useMemo } from 'react'
import { DepositsControlPageContext } from './context'
import { DepositsControlPageControllerProps } from './types'
import { useApi } from '@hooks/api'
import { TransactionsAdminApi } from '@services/api/transactions_admin_api'

export const DepositsControlPageController = ({
  children,
}: DepositsControlPageControllerProps): JSX.Element => {
  const api = useApi()
  const handleFindTransactions = useCallback(
    (
      limit: number,
      cursor: string | undefined,
      filters: Record<string, string> | undefined
    ) => {
      return api.instanceOf<TransactionsAdminApi>(TransactionsAdminApi).list({
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
    <DepositsControlPageContext.Provider value={state}>
      {children}
    </DepositsControlPageContext.Provider>
  )
}
