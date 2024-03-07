import { HttpMessageType } from '@type/http_error_type'
import { LoginFormType } from '@type/login_form_type'

export type SigninPageProps = {}

export type SigninPageControllerProps = SigninPageProps & {
  children: JSX.Element
}

export type SigninPageContextProps = {
  loading: boolean
  error: HttpMessageType | undefined
  handleSignup: () => void
  handleSubmitForm: (form: LoginFormType) => void
}
