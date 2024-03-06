import { useMemo } from 'react'
import { NotFoundedPageContext } from './context'
import { NotFoundedPageControllerProps } from './types'

export const NotFoundedPageController = ({
  children,
}: NotFoundedPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])
  return (
    <NotFoundedPageContext.Provider value={state}>
      {children}
    </NotFoundedPageContext.Provider>
  )
}
