export type PrivatePageProps = {}

export type PrivatePageControllerProps = PrivatePageProps & {
  children: JSX.Element
}

export type PrivatePageContextProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
}
