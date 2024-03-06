import { useMemo } from 'react'
import { DepositsNewPageContext } from './context'
import { DepositsNewPageControllerProps } from './types'

export const DepositsNewPageController = ({
  children,
}: DepositsNewPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <DepositsNewPageContext.Provider value={state}>
      {children}
    </DepositsNewPageContext.Provider>
  )
}
