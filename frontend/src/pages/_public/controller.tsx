import { useMemo } from 'react'
import { PublicPageContext } from './context'
import { PublicPageControllerProps } from './types'

export const PublicPageController = ({
  children,
}: PublicPageControllerProps): JSX.Element => {
  const state = useMemo(() => ({}), [])

  return (
    <PublicPageContext.Provider value={state}>
      {children}
    </PublicPageContext.Provider>
  )
}
