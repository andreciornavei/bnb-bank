import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export type FormUpdateTransactionStatusType = {
  id?: string
  status?: TransactionStatusEnum
}
