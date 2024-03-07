import { TransactionEntity } from '@entities/TransactionEntity'

export type DepositsControlPageProps = {}

export type DepositsControlPageControllerProps = DepositsControlPageProps & {
  children: JSX.Element
}

export type DepositsControlPageContextProps = {
  handleFindTransactions: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<TransactionEntity[]>
}
