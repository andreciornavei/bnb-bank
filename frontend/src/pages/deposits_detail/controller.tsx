import { useMemo } from 'react'
import { DepositsDetailPageContext } from './context'
import { DepositsDetailPageControllerProps } from './types'

export const DepositsDetailPageController = ({
  children,
}: DepositsDetailPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <DepositsDetailPageContext.Provider value={state}>
      {children}
    </DepositsDetailPageContext.Provider>
  )
}
