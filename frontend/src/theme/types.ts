import { SimplePaletteColorOptions } from '@mui/material'

export {}
declare module '@mui/material' {
  interface Palette {
    muted: SimplePaletteColorOptions
    tertiary: SimplePaletteColorOptions
  }
  interface PaletteOptions {
    muted: SimplePaletteColorOptions
    tertiary: SimplePaletteColorOptions
  }
}
