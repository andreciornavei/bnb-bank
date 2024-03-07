import { useCallback, useMemo, useState } from 'react'
import { SignupPageContext } from './context'
import { SignupPageControllerProps } from './types'
import { useNavigate } from 'react-router-dom'
import { RegisterFormType } from '@type/register_form_type'
import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useSnackbar } from 'notistack'
import { HttpMessageType } from '@type/http_error_type'
import { AuthApi } from '@services/api/auth_api'

export const SignupPageController = ({
  children,
}: SignupPageControllerProps): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<HttpMessageType | undefined>(undefined)

  const handleSignin = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleSubmitForm = useCallback(
    (form: RegisterFormType) => {
      setLoading(true)
      setError(undefined)
      api
        .instanceOf<AuthApi>(AuthApi)
        .register(form)
        .then((user) => [
          auth.setUser(user),
          navigate('/balance', { replace: true }),
        ])
        .catch((error) => [
          setError(error?.response?.data),
          enqueueSnackbar({
            message:
              error.response?.data?.error?.message || 'Authentication Error',
          }),
        ])
        .finally(() => setLoading(false))
    },
    [navigate, auth, api, enqueueSnackbar]
  )

  const state = useMemo(
    () => ({ loading, error, handleSubmitForm, handleSignin }),
    [loading, error, handleSubmitForm, handleSignin]
  )
  return (
    <SignupPageContext.Provider value={state}>
      {children}
    </SignupPageContext.Provider>
  )
}
