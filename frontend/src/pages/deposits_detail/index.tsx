import { DepositsDetailPageController } from './controller'
import { DepositsDetailPageProps } from './types'
import { DepositsDetailPageView } from './view'

export const DepositsDetailPage = (
  props: DepositsDetailPageProps
): JSX.Element => {
  return (
    <DepositsDetailPageController {...props}>
      <DepositsDetailPageView />
    </DepositsDetailPageController>
  )
}
