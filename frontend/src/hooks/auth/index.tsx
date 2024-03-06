/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { UserEntity } from "@entities/UserEntity";
import React, { useState, useMemo, createContext, useContext } from "react";

const Context = createContext(
  {} as {
    user: UserEntity | undefined;
    disconnecting: boolean;
    setUser: React.Dispatch<React.SetStateAction<UserEntity | undefined>>;
    disconnect: () => void;
    authenticate: (user: UserEntity) => void;
  }
);

const AuthProvider = (props: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [disconnecting, setDisconnecting] = useState<boolean>(false);
  const [user, setUser] = useState<UserEntity | undefined>(undefined);

  const authenticate = React.useCallback((user: UserEntity) => {
    setUser(user);
    navigate("/loading", { replace: true });
  }, []);

  const disconnect = React.useCallback(() => {
    setDisconnecting(true);
    axios
      .create({
        baseURL: process.env.REACT_APP_ACCOUNT_API!,
        withCredentials: true,
      })
      .post("/logout")
      .then(() => {
        setUser(undefined);
        navigate("/", { replace: true });
      })
      .then(() => snackbar.enqueueSnackbar("Você foi desconectado..."))
      .catch(() =>
        snackbar.enqueueSnackbar("Falha ao desconectar...", {
          variant: "error",
        })
      )
      .finally(() => {
        setDisconnecting(false);
        window.location.href = `${process.env
          .REACT_APP_ACCOUNT_URL!}/login?callback=${window.location.href}`;
      });
  }, []);

  const authProviderValues = useMemo(
    () => ({
      user,
      disconnecting,
      setUser,
      disconnect,
      authenticate,
      setDisconnecting,
    }),
    [user, disconnecting, setUser, authenticate, disconnect, setDisconnecting]
  );

  return (
    <Context.Provider value={authProviderValues}>
      {props.children}
    </Context.Provider>
  );
};

const useAuth = () => {
  const context = useContext(Context);
  return context;
};

export { AuthProvider, useAuth };
