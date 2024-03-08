import React from 'react'
import { useCallback, useMemo } from 'react'
import { PrivatePageContext } from './context'
import { PrivatePageControllerProps } from './types'

export const PrivatePageController = ({
  children,
}: PrivatePageControllerProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
    },
    [setOpen]
  )

  const state = useMemo(() => ({ open, toggleDrawer }), [open, toggleDrawer])

  return (
    <PrivatePageContext.Provider value={state}>
      {children}
    </PrivatePageContext.Provider>
  )
}
