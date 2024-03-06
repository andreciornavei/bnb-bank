import { useCallback, useMemo } from 'react'
import { SignupPageContext } from './context'
import { SignupPageControllerProps } from './types'
import { useNavigate } from 'react-router-dom'

export const SignupPageController = ({
  children,
}: SignupPageControllerProps): JSX.Element => {
  const navigate = useNavigate()

  const handleSignin = useCallback(() => {
    navigate('/')
  }, [navigate])

  const state = useMemo(() => ({ handleSignin }), [handleSignin])
  return (
    <SignupPageContext.Provider value={state}>
      {children}
    </SignupPageContext.Provider>
  )
}
