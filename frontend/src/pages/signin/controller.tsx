import { useCallback, useMemo, useState } from 'react'
import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useSnackbar } from 'notistack'
import { SigninPageContext } from './context'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from '@services/api/auth_api'
import { SigninPageControllerProps } from './types'
import { LoginFormType } from '@type/login_form_type'
import { HttpMessageType } from '@type/http_error_type'

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
        .then(auth.authenticated)
        .catch((error) => [
          setError(error?.response?.data),
          enqueueSnackbar({
            message:
              error.response?.data?.error?.message || 'Authentication Error',
          }),
        ])
        .finally(() => setLoading(false))
    },
    [auth, api, enqueueSnackbar]
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
