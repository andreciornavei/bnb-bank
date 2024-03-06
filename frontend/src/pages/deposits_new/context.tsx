import { createContext } from 'use-context-selector'
import { DepositsNewPageContextProps } from './types'

export const DepositsNewPageContext = createContext(
  {} as DepositsNewPageContextProps
)
