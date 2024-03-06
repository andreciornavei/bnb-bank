import { createContext } from 'use-context-selector'
import { DepositsDetailPageContextProps } from './types'

export const DepositsDetailPageContext = createContext(
  {} as DepositsDetailPageContextProps
)
