/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import React from 'react'
import axios from 'axios'
import { ApiAction } from './action'
import { useAuth } from '@hooks/auth'
import { ApiProps, ApiStateProps } from './types'

const ApiContext = React.createContext<ApiStateProps>({} as ApiStateProps)

export const ApiProvider = (props: ApiProps): JSX.Element => {
  const auth = useAuth()
  const http = axios.create({
    baseURL: props.apiBaseURL,
    withCredentials: true,
  })

  http.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        auth.disconnect()
      }
      return Promise.reject(error)
    }
  )

  const instanceOf = <T extends ApiAction>(action: typeof ApiAction): T => {
    return new action(http) as T
  }

  const state = {
    http,
    instanceOf,
  }

  return (
    <ApiContext.Provider value={state}>{props.children}</ApiContext.Provider>
  )
}

export function useApi() {
  const context = React.useContext(ApiContext)
  return context
}

export function resolvePreventAuth(config: object) {
  _.set(config, 'headers.XPreventAuth', true)
  return config
}
