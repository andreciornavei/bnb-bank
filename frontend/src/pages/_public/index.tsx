import { PublicPageController } from './controller'
import { PublicPageProps } from './types'
import { PublicPageView } from './view'

export const PublicPage = (props: PublicPageProps): JSX.Element => {
  return (
    <PublicPageController {...props}>
      <PublicPageView />
    </PublicPageController>
  )
}
