import { createContext } from 'use-context-selector'
import { PrivatePageContextProps } from './types'

export const PrivatePageContext = createContext({} as PrivatePageContextProps)
