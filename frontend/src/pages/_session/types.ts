export type SessionPageProps = {}
export type SessionPageControllerProps = SessionPageProps & {
  children: JSX.Element
}
export type SessionPageContextProps = {
  loading: boolean
  leaving: boolean
  handleLogout: () => void
}
