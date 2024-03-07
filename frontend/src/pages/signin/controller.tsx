import { useCallback, useMemo } from 'react'
import { SigninPageContext } from './context'
import { SigninPageControllerProps } from './types'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@hooks/api'
import { AuthApi } from '@services/api/auth_api'
import { LoginFormType } from '@type/login_form_type'
import { useAuth } from '@hooks/auth'

export const SigninPageController = ({
  children,
}: SigninPageControllerProps): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(
    (form: LoginFormType) => {
      api
        .instanceOf<AuthApi>(AuthApi)
        .login(form)
        .then((user) => [
          auth.setUser(user),
          navigate('/balance', { replace: true }),
        ])
        .catch((error) => console.error(error.message))
    },
    [navigate, auth, api]
  )

  const handleSignup = useCallback(() => navigate('/signup'), [navigate])

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
