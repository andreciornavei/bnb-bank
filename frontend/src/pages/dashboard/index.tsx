import { DashboardPageController } from './controller'
import { DashboardPageProps } from './types'
import { DashboardPageView } from './view'

export const DashboardPage = (props: DashboardPageProps): JSX.Element => {
  return (
    <DashboardPageController {...props}>
      <DashboardPageView />
    </DashboardPageController>
  )
}
