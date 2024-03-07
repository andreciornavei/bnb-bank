import { TransactionEntity } from '@entities/TransactionEntity'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export type DepositsDetailPageProps = {}

export type DepositsDetailPageControllerProps = DepositsDetailPageProps & {
  children: JSX.Element
}

export type DepositsDetailPageContextProps = {
  loading: boolean
  updating: boolean
  transaction: TransactionEntity | undefined
  handleTransactionControl: (status: TransactionStatusEnum) => void
}
