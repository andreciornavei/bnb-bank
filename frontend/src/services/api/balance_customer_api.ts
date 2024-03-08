import { formatDate } from '@utils/formatter'
import { ApiAction } from '../../hooks/api/action'
import { BalanceSumaryEntity } from '@entities/BalanceSummaryEntity'
import { FormFindBalanceSummaryType } from '@type/form_find_balance_summary_type'

export class BalanceCustomerApi extends ApiAction {
  async summary(
    props: FormFindBalanceSummaryType
  ): Promise<BalanceSumaryEntity> {
    const filters = []
    if (props.period_from)
      filters.push(`from=${formatDate(props.period_from, 'YYYY-MM-DD')}`)
    if (props.period_to)
      filters.push(`to=${formatDate(props.period_to, 'YYYY-MM-DD')}`)
    const response = await this.http.get<BalanceSumaryEntity>(
      `/api/balance/summary?${filters.join('&')}`
    )
    return response.data
  }
}
