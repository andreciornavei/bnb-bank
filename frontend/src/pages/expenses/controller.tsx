import { useMemo } from 'react'
import { ExpensesPageContext } from './context'
import { ExpensesPageControllerProps } from './types'

export const ExpensesPageController = ({
  children,
}: ExpensesPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <ExpensesPageContext.Provider value={state}>
      {children}
    </ExpensesPageContext.Provider>
  )
}
