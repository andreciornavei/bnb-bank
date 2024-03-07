import { useCallback, useMemo, useState } from 'react'
import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useSnackbar } from 'notistack'
import { SignupPageContext } from './context'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from '@services/api/auth_api'
import { SignupPageControllerProps } from './types'
import { HttpMessageType } from '@type/http_error_type'
import { RegisterFormType } from '@type/register_form_type'

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
