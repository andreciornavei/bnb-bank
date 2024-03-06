import { useCallback, useMemo } from 'react'
import { DashboardPageContext } from './context'
import { DashboardPageControllerProps } from './types'
import React from 'react'

export const DashboardPageController = ({
  children,
}: DashboardPageControllerProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
    },
    [setOpen]
  )

  const state = useMemo(() => ({ open, toggleDrawer }), [open, toggleDrawer])

  return (
    <DashboardPageContext.Provider value={state}>
      {children}
    </DashboardPageContext.Provider>
  )
}
