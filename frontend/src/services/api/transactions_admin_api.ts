import { ApiAction } from '../../hooks/api/action'
import { TransactionEntity } from '@entities/TransactionEntity'
import { FormFindTransactionsType } from '@type/form_find_transactions_type'
import { FormUpdateTransactionStatusType } from '@type/form_update_transaction_status_type'

export class TransactionsAdminApi extends ApiAction {
  async list(props: FormFindTransactionsType): Promise<TransactionEntity[]> {
    const filters = []
    if (props.id) filters.push(`id=${props.id}`)
    if (props.limit) filters.push(`limit=${props.limit}`)
    if (props.cursor) filters.push(`cursor=${props.cursor}`)
    const response = await this.http.get<TransactionEntity[]>(
      `/api/transactions/pendings?${filters.join('&')}`
    )
    return response.data
  }
  async updateStatus(
    props: FormUpdateTransactionStatusType
  ): Promise<TransactionEntity> {
    const response = await this.http.put<TransactionEntity>(
      `/api/transactions/${props.id}/${props.status}`
    )
    return response.data
  }
}
