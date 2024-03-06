import { createTheme } from '@mui/material'
import { TextField } from './TextField/TextField'
import { Button } from './Button/Button'
import { Menu } from './Menu/Menu'
import { Select } from './Select'

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    tiny: true
  }
}

export const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold',
      letterSpacing: 0,
      fontSize: '40px',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: -1,
      fontSize: '32px',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: '24px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: '18px',
    },
  },
  palette: {
    primary: {
      contrastText: '#000000',
      main: '#2799fb',
    },
    secondary: {
      contrastText: '#ffffff',
      main: '#bde0fe',
    },
    tertiary: {
      contrastText: '#2799fb',
      main: '#daefff',
    },
    muted: {
      contrastText: '#2799fb',
      main: '#f1f9fe',
    },
    error: {
      contrastText: '#ffffff',
      main: '#e75e47',
    },
  },
})

export const DefaultTheme = createTheme(theme, {
  components: {
    ...TextField,
    ...Button,
    ...Menu,
    ...Select,
  },
})
