import { createContext } from 'use-context-selector'
import { DashboardPageContextProps } from './types'

export const DashboardPageContext = createContext(
  {} as DashboardPageContextProps
)
