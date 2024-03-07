import { LoginFormType } from '@type/login_form_type'

export type SigninPageProps = {}

export type SigninPageControllerProps = SigninPageProps & {
  children: JSX.Element
}

export type SigninPageContextProps = {
  handleSignup: () => void
  handleSubmitForm: (form: LoginFormType) => void
}
