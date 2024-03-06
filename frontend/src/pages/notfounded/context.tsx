import { createContext } from 'use-context-selector'
import { NotFoundedPageContextProps } from './types'

export const NotFoundedPageContext = createContext(
  {} as NotFoundedPageContextProps
)
