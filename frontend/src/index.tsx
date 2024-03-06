import './index.css'
import React from 'react'
import Router from './router'
import { enableMapSet } from 'immer'
import { DefaultTheme } from './theme'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@hooks/api'
import { AuthProvider } from '@hooks/auth'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
enableMapSet()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <BrowserRouter>
          <AuthProvider>
            <ApiProvider apiBaseURL={process.env.REACT_APP_API_URL}>
              <Router />
            </ApiProvider>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
