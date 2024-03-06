import { useMemo } from 'react'
import { DepositsControlPageContext } from './context'
import { DepositsControlPageControllerProps } from './types'

export const DepositsControlPageController = ({
  children,
}: DepositsControlPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <DepositsControlPageContext.Provider value={state}>
      {children}
    </DepositsControlPageContext.Provider>
  )
}
