import { DepositsNewPageController } from './controller'
import { DepositsNewPageProps } from './types'
import { DepositsNewPageView } from './view'

export const DepositsNewPage = (props: DepositsNewPageProps): JSX.Element => {
  return (
    <DepositsNewPageController {...props}>
      <DepositsNewPageView />
    </DepositsNewPageController>
  )
}
