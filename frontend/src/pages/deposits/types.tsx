import { FlatListRefType } from '@components/flatlist/types'
import { TransactionEntity } from '@entities/TransactionEntity'

export type DepositsPageProps = {}

export type DepositsPageControllerProps = DepositsPageProps & {
  children: JSX.Element
}

export type DepositsPageContextProps = {
  refFlatList: React.RefObject<FlatListRefType>
  handleFindTransactions: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<TransactionEntity[]>
}
