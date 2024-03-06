import { ExpensesPageController } from './controller'
import { ExpensesPageProps } from './types'
import { ExpensesPageView } from './view'

export const ExpensesPage = (props: ExpensesPageProps): JSX.Element => {
  return (
    <ExpensesPageController {...props}>
      <ExpensesPageView />
    </ExpensesPageController>
  )
}
