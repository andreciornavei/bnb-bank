import { BalancePageController } from './controller'
import { BalancePageProps } from './types'
import { BalancePageView } from './view'

export const BalancePage = (props: BalancePageProps): JSX.Element => {
  return (
    <BalancePageController {...props}>
      <BalancePageView />
    </BalancePageController>
  )
}
