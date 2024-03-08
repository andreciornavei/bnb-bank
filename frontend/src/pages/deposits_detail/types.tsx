import { TransactionEntity } from '@entities/TransactionEntity'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'
import { PresignedUrlType } from '@type/presigned_url_type'

export type DepositsDetailPageProps = {}

export type DepositsDetailPageControllerProps = DepositsDetailPageProps & {
  children: JSX.Element
}

export type DepositsDetailPageContextProps = {
  loading: boolean
  updating: boolean
  presignedUrl: PresignedUrlType | undefined
  transaction: TransactionEntity | undefined
  handleTransactionControl: (status: TransactionStatusEnum) => void
}
