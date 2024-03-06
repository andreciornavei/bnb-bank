import { DepositsControlPageController } from './controller'
import { DepositsControlPageProps } from './types'
import { DepositsControlPageView } from './view'

export const DepositsControlPage = (
  props: DepositsControlPageProps
): JSX.Element => {
  return (
    <DepositsControlPageController {...props}>
      <DepositsControlPageView />
    </DepositsControlPageController>
  )
}
