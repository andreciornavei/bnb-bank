import { SigninPageController } from './controller'
import { SigninPageProps } from './types'
import { SigninPageView } from './view'

export const SigninPage = (props: SigninPageProps): JSX.Element => {
  return (
    <SigninPageController {...props}>
      <SigninPageView />
    </SigninPageController>
  )
}
