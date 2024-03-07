import { ApiAction } from '../../hooks/api/action'
import { FormPurchaseType } from '@type/form_purchase_type'
import { UserEntity } from '@entities/UserEntity'
import { FormDepositType } from '@type/form_deposit_type'
import { TransactionEntity } from '@entities/TransactionEntity'
import { PresignedUrlType } from '@type/presigned_url_type'

export class TransactionsApi extends ApiAction {
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
}
