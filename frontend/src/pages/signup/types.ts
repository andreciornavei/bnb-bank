import { HttpMessageType } from '@type/http_error_type'
import { RegisterFormType } from '@type/register_form_type'

export type SignupPageProps = {}

export type SignupPageControllerProps = SignupPageProps & {
  children: JSX.Element
}

export type SignupPageContextProps = {
  loading: boolean
  error: HttpMessageType | undefined
  handleSignin: () => void
  handleSubmitForm: (form: RegisterFormType) => void
}
