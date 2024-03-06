import { NotFoundedPageController } from './controller'
import { NotFoundedPageProps } from './types'
import { NotFoundedPageView } from './view'

export const NotFoundedPage = (props: NotFoundedPageProps): JSX.Element => {
  return (
    <NotFoundedPageController {...props}>
      <NotFoundedPageView />
    </NotFoundedPageController>
  )
}
