import { ApiAction } from '../../hooks/api/action'
import { FormPurchaseType } from '@type/form_purchase_type'
import { UserEntity } from '@entities/UserEntity'
import { FormDepositType } from '@type/form_deposit_type'
import { TransactionEntity } from '@entities/TransactionEntity'
import { PresignedUrlType } from '@type/presigned_url_type'
import { FormFindTransactionsType } from '@type/form_find_transactions_type'

export class TransactionsCustomerApi extends ApiAction {
  async purchase(payload: FormPurchaseType): Promise<UserEntity> {
    const response = await this.http.post<UserEntity>(`/api/transactions`, {
      ...payload,
      factor: -1,
    })
    return response.data
  }
  async deposit(payload: FormDepositType): Promise<TransactionEntity> {
    const response = await this.http.post<TransactionEntity>(
      `/api/transactions`,
      { ...payload, factor: 1 }
    )
    return response.data
  }
  async presignUpload(): Promise<PresignedUrlType> {
    const response = await this.http.post<PresignedUrlType>(
      `/api/transactions/upload`
    )
    return response.data
  }
  async list(props: FormFindTransactionsType): Promise<TransactionEntity[]> {
    const filters = []
    if (props.limit) filters.push(`limit=${props.limit}`)
    if (props.cursor) filters.push(`cursor=${props.cursor}`)
    if (props.factor) filters.push(`factor=${props.factor}`)
    if (props.status) filters.push(`status=${props.status.join(',')}`)
    const response = await this.http.get<TransactionEntity[]>(
      `/api/transactions?${filters.join('&')}`
    )
    return response.data
  }
}
