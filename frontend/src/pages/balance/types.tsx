import { BalanceSumaryEntity } from '@entities/BalanceSummaryEntity'
import { TransactionEntity } from '@entities/TransactionEntity'

export type BalancePageProps = {}

export type BalancePageControllerProps = BalancePageProps & {
  children: JSX.Element
}

export type BalancePageContextProps = {
  loadingSummary: boolean
  summary: BalanceSumaryEntity | undefined
  handleFindTransactions: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<TransactionEntity[]>
}
