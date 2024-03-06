export type SignupPageProps = {}

export type SignupPageControllerProps = SignupPageProps & {
  children: JSX.Element
}

export type SignupPageContextProps = {
  handleSignin: () => void
}
