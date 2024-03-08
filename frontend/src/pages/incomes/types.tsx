import { TransactionEntity } from '@entities/TransactionEntity'

export type IncomesPageProps = {}

export type IncomesPageControllerProps = IncomesPageProps & {
  children: JSX.Element
}

export type IncomesPageContextProps = {
  handleFindTransactions: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<TransactionEntity[]>
}
