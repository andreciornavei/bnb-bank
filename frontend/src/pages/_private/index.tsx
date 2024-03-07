import { PrivatePageController } from './controller'
import { PrivatePageProps } from './types'
import { PrivatePageView } from './view'

export const PrivatePage = (props: PrivatePageProps): JSX.Element => {
  return (
    <PrivatePageController {...props}>
      <PrivatePageView />
    </PrivatePageController>
  )
}
