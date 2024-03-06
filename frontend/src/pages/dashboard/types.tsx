export type DashboardPageProps = {}

export type DashboardPageControllerProps = DashboardPageProps & {
  children: JSX.Element
}

export type DashboardPageContextProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
}
