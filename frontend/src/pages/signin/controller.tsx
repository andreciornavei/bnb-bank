import { useCallback, useMemo, useState } from 'react'
import { SigninPageContext } from './context'
import { SigninPageControllerProps } from './types'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@hooks/api'
import { AuthApi } from '@services/api/auth_api'
import { LoginFormType } from '@type/login_form_type'
import { useAuth } from '@hooks/auth'
import { HttpMessageType } from '@type/http_error_type'
import { useSnackbar } from 'notistack'

export const SigninPageController = ({
  children,
}: SigninPageControllerProps): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<HttpMessageType | undefined>(undefined)

  const handleSubmitForm = useCallback(
    (form: LoginFormType) => {
      setLoading(true)
      setError(undefined)
      api
        .instanceOf<AuthApi>(AuthApi)
        .login(form)
        .then((user) => [
          auth.setUser(user),
          navigate('/balance', { replace: true }),
        ])
        .catch((error) => [
          setError(error.response.data),
          enqueueSnackbar({
            message:
              error.response?.data?.error?.message || 'Authentication Error',
          }),
        ])
        .finally(() => setLoading(false))
    },
    [navigate, auth, api, enqueueSnackbar]
  )

  const handleSignup = useCallback(() => navigate('/signup'), [navigate])

  const state = useMemo(
    () => ({ error, loading, handleSignup, handleSubmitForm }),
    [error, loading, handleSignup, handleSubmitForm]
  )
  return (
    <SigninPageContext.Provider value={state}>
      {children}
    </SigninPageContext.Provider>
  )
}
