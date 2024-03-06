import { useCallback, useMemo } from 'react'
import { SigninPageContext } from './context'
import { SigninPageControllerProps } from './types'
import { useNavigate } from 'react-router-dom'

export const SigninPageController = ({
  children,
}: SigninPageControllerProps): JSX.Element => {
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(() => {
    navigate('/balance')
  }, [navigate])

  const handleSignup = useCallback(() => {
    navigate('/signup')
  }, [navigate])

  const state = useMemo(
    () => ({ handleSignup, handleSubmitForm }),
    [handleSignup, handleSubmitForm]
  )
  return (
    <SigninPageContext.Provider value={state}>
      {children}
    </SigninPageContext.Provider>
  )
}
