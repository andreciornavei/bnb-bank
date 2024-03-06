/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useSnackbar } from 'notistack'
import { SessionPageContext } from './context'
import { AuthApi } from '@services/api/auth_api'
import { UserEntity } from '@entities/UserEntity'
import { SessionPageControllerProps } from './types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SessionPageController = (
  props: SessionPageControllerProps
): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(true)

  const handleRedirectUser = (user: UserEntity) => {
    // update user context
    auth.setUser(user)
  }

  const handleLoadSession = useCallback(() => {
    // start loading indicator
    setLoading(true)
    // call session api to retrieve user data
    // and start application logic handling
    api
      .instanceOf<AuthApi>(AuthApi)
      .session()
      .then(handleRedirectUser)
      .catch(() => [
        enqueueSnackbar('Falha ao obter sessão do usuário'),
        navigate('/', { replace: true }),
      ])
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    handleLoadSession()
  }, [])

  const state = useMemo(() => ({ loading }), [loading])

  return (
    <SessionPageContext.Provider value={state}>
      {props.children}
    </SessionPageContext.Provider>
  )
}
