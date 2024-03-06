import { useMemo } from 'react'
import { PurchasePageContext } from './context'
import { PurchasePageControllerProps } from './types'

export const PurchasePageController = ({
  children,
}: PurchasePageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <PurchasePageContext.Provider value={state}>
      {children}
    </PurchasePageContext.Provider>
  )
}
