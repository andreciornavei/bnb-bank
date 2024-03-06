import { useMemo } from 'react'
import { BalancePageContext } from './context'
import { BalancePageControllerProps } from './types'

export const BalancePageController = ({
  children,
}: BalancePageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <BalancePageContext.Provider value={state}>
      {children}
    </BalancePageContext.Provider>
  )
}
