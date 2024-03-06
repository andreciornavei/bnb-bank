import { DepositsPageController } from './controller'
import { DepositsPageProps } from './types'
import { DepositsPageView } from './view'

export const DepositsPage = (props: DepositsPageProps): JSX.Element => {
  return (
    <DepositsPageController {...props}>
      <DepositsPageView />
    </DepositsPageController>
  )
}
