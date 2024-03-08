import moment from 'moment'
import { useApi } from '@hooks/api'
import { BalancePageContext } from './context'
import { BalancePageControllerProps } from './types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BalanceSumaryEntity } from '@entities/BalanceSummaryEntity'
import { BalanceCustomerApi } from '@services/api/balance_customer_api'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'

export const BalancePageController = ({
  children,
}: BalancePageControllerProps): JSX.Element => {
  const api = useApi()
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false)
  const [summary, setSummary] = useState<BalanceSumaryEntity | undefined>(
    undefined
  )

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

  const handleLoadBalanceSummary = useCallback(() => {
    setLoadingSummary(true)
    api
      .instanceOf<BalanceCustomerApi>(BalanceCustomerApi)
      .summary({
        period_from: moment().startOf('month').toDate(),
        period_to: moment().endOf('month').toDate(),
      })
      .then(setSummary)
      .catch((error) => console.log('ERROR=', error))
      .finally(() => setLoadingSummary(false))
  }, [api])

  useEffect(() => {
    handleLoadBalanceSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const state = useMemo(
    () => ({ loadingSummary, summary, handleFindTransactions }),
    [loadingSummary, summary, handleFindTransactions]
  )

  return (
    <BalancePageContext.Provider value={state}>
      {children}
    </BalancePageContext.Provider>
  )
}
