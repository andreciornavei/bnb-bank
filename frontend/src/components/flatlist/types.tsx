import { Icon } from '@phosphor-icons/react'

export type FlatListProps = {
  limit?: number
  rowSpacing?: number
  tableStyle?: React.CSSProperties | undefined
  emptyIcon?: Icon
  emptyTitle?: string
  emptyMessage: string
  loadingMessage?: string
  itemKey: (item: any) => string
  renderItem: (item: any, prevItem: any) => JSX.Element | JSX.Element[]
  renderHeader?: () => JSX.Element
  handleFetch: (
    limit: number,
    cursor: string | undefined,
    filters: Record<string, string> | undefined
  ) => Promise<Array<unknown>>
}

export type FlatListContextProps = {
  records: unknown[]
  isLoading: boolean
  endReached: boolean
  handleLoadMore: () => void
}

export type FlatListControllerProps = FlatListProps & {
  children: JSX.Element
}

export type FlatListRefType = {
  refresh: (filters?: Record<string, string>) => void
  updateRecord: (key: string, record: unknown) => void
}
