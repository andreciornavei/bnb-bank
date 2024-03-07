/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useNavigate } from 'react-router-dom'
import { SessionPageContext } from './context'
import { AuthApi } from '@services/api/auth_api'
import { SessionPageControllerProps } from './types'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const SessionPageController = (
  props: SessionPageControllerProps
): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)

  const handleFailure = () => {
    navigate('/', { replace: true })
  }

  const handleLoadSession = useCallback(() => {
    // start loading indicator
    setLoading(true)
    // call session api to retrieve user data
    // and start application logic handling
    api
      .instanceOf<AuthApi>(AuthApi)
      .session()
      .then((user) => auth.authenticated(user, true))
      .catch(handleFailure)
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
