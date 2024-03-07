/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom'
import { UserEntity } from '@entities/UserEntity'
import React, { useState, useMemo, createContext, useContext } from 'react'
import { RoleEnum } from '@enums/role_enum'

const Context = createContext(
  {} as {
    user: UserEntity | undefined
    disconnecting: boolean
    setUser: React.Dispatch<React.SetStateAction<UserEntity | undefined>>
    disconnect: () => void
    authenticated: (user: UserEntity, avoidRedirect?: boolean) => void
  }
)
const rootpath: Record<RoleEnum, string> = {
  admin: '/deposits/control',
  customer: '/balance',
}

const AuthProvider = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const [disconnecting, setDisconnecting] = useState<boolean>(false)
  const [user, setUser] = useState<UserEntity | undefined>(undefined)

  const authenticated = (user: UserEntity, avoidRedirect?: boolean) => {
    setUser(user)
    if (!avoidRedirect) navigate(rootpath[user.role], { replace: true })
  }

  const disconnect = React.useCallback(() => {
    setUser(undefined)
    navigate('/', { replace: true })
  }, [])

  const authProviderValues = useMemo(
    () => ({
      user,
      disconnecting,
      setUser,
      disconnect,
      authenticated,
      setDisconnecting,
    }),
    [user, disconnecting, setUser, disconnect, setDisconnecting]
  )

  return (
    <Context.Provider value={authProviderValues}>
      {props.children}
    </Context.Provider>
  )
}

const useAuth = () => {
  const context = useContext(Context)
  return context
}

export { AuthProvider, useAuth }
