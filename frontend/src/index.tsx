import './index.css'
import Router from './router'
import { enableMapSet } from 'immer'
import { DefaultTheme } from './theme'
import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@hooks/api'
import { AuthProvider } from '@hooks/auth'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
enableMapSet()

// Install Sentry For Monitoring
Sentry.init({
  dsn: 'https://56ff0892b732563d22086de012c5a22c@o4506876266741760.ingest.us.sentry.io/4506876269494272',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/bnb-bank.andreciornavei\.com\.br/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={DefaultTheme}>
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
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
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
