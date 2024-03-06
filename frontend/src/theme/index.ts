import { createTheme } from '@mui/material'
import { TextField } from './TextField/TextField'
import { Button } from './Button/Button'
import { Menu } from './Menu/Menu'
import { Select } from './Select'
import { theme } from './theme'

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true
  }
}

export const DefaultTheme = createTheme(theme, {
  components: {
    ...TextField,
    ...Button,
    ...Menu,
    ...Select,
  },
})
