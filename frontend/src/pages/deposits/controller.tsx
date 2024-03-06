import { useMemo } from 'react'
import { DepositsPageContext } from './context'
import { DepositsPageControllerProps } from './types'

export const DepositsPageController = ({
  children,
}: DepositsPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <DepositsPageContext.Provider value={state}>
      {children}
    </DepositsPageContext.Provider>
  )
}
