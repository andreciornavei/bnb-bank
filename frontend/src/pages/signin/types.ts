export type SigninPageProps = {}

export type SigninPageControllerProps = SigninPageProps & {
  children: JSX.Element
}

export type SigninPageContextProps = {
  handleSignup: () => void
  handleSubmitForm: () => void
}
