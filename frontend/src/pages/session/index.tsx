import { SessionPageView } from './view'
import { SessionPageProps } from './types'
import { SessionPageController } from './controller'

export const SessionPage = (props: SessionPageProps): JSX.Element => {
  return (
    <SessionPageController {...props}>
      <SessionPageView />
    </SessionPageController>
  )
}
