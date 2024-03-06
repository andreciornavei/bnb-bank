import { PurchasePageController } from './controller'
import { PurchasePageProps } from './types'
import { PurchasePageView } from './view'

export const PurchasePage = (props: PurchasePageProps): JSX.Element => {
  return (
    <PurchasePageController {...props}>
      <PurchasePageView />
    </PurchasePageController>
  )
}
