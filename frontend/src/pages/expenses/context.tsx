import { createContext } from 'use-context-selector'
import { ExpensesPageContextProps } from './types'

export const ExpensesPageContext = createContext({} as ExpensesPageContextProps)
