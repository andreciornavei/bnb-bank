import { SignupPageController } from './controller'
import { SignupPageProps } from './types'
import { SignupPageView } from './view'

export const SignupPage = (props: SignupPageProps): JSX.Element => {
  return (
    <SignupPageController {...props}>
      <SignupPageView />
    </SignupPageController>
  )
}
