import { TransactionEntity } from '@entities/TransactionEntity'

export type ExpensesPageProps = {}

export type ExpensesPageControllerProps = ExpensesPageProps & {
  children: JSX.Element
}

export type ExpensesPageContextProps = {
  handleFindTransactions: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<TransactionEntity[]>
}
