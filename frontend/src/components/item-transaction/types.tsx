import { TransactionEntity } from '@entities/TransactionEntity'

export type ItemTransactionProps = {
  data: TransactionEntity
  prevData?: TransactionEntity
  href?: string
  onClick?: (transaction: TransactionEntity) => void
  labelField?: keyof TransactionEntity
}
