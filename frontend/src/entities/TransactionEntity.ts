import { TransactionFactorEnum } from '@enums/transaction_factor_enum'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export type TransactionEntity = {
  _id: string
  user_id: string
  user_email: string
  user_username: string
  description: string
  document: string
  amount: number
  factor: TransactionFactorEnum
  status: TransactionStatusEnum
  created_at: string
  updated_at: string
}
