/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom'
import { UserEntity } from '@entities/UserEntity'
import React, { useState, useMemo, createContext, useContext } from 'react'

const Context = createContext(
  {} as {
    user: UserEntity | undefined
    disconnecting: boolean
    setUser: React.Dispatch<React.SetStateAction<UserEntity | undefined>>
    disconnect: () => void
  }
)

const AuthProvider = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const [disconnecting, setDisconnecting] = useState<boolean>(false)
  const [user, setUser] = useState<UserEntity | undefined>(undefined)

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
