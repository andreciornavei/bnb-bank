import { TransactionFactorEnum } from '@enums/transaction_factor_enum'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

export type FormFindTransactionsType = {
  id?: string
  limit?: number
  cursor?: string
  factor?: TransactionFactorEnum
  status?: TransactionStatusEnum[]
}
