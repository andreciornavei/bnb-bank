import { IncomesPageController } from './controller'
import { IncomesPageProps } from './types'
import { IncomesPageView } from './view'

export const IncomesPage = (props: IncomesPageProps): JSX.Element => {
  return (
    <IncomesPageController {...props}>
      <IncomesPageView />
    </IncomesPageController>
  )
}
