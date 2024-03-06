import { createContext } from 'use-context-selector'
import { DepositsControlPageContextProps } from './types'

export const DepositsControlPageContext = createContext(
  {} as DepositsControlPageContextProps
)
