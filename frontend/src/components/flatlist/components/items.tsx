import { Stack } from '@mui/material'
import { FlatListContext } from '../context'
import { File, Icon } from '@phosphor-icons/react'
import { LoadingPage } from '@components/loading-page'
import { MessagePage } from '@components/message-page'
import { useContextSelector } from 'use-context-selector'

type Props = {
  loading?: boolean
  loadingMessage?: string
  emptyIcon?: Icon
  emptyTitle?: string
  emptyMessage?: string
  displayRecords?: unknown[]
  rowSpacing?: number
  tableStyle?: React.CSSProperties | undefined
  itemKey: (item: any) => string
  renderItem: (item: any, prevItem: any) => JSX.Element | JSX.Element[]
  renderHeader?: () => JSX.Element
}
export const FlatListItems = ({
  emptyIcon = File,
  emptyTitle = 'Empty',
  emptyMessage = 'No results to show',
  loadingMessage = 'Loading results...',
  rowSpacing = 10,
  tableStyle = {},
  renderItem,
  itemKey,
  ...props
}: Props): JSX.Element | null => {
  const isLoading = useContextSelector(FlatListContext, (s) => s.isLoading)
  const records = useContextSelector(FlatListContext, (s) => s.records)

  if (!!isLoading && records.length === 0) {
    return (
      <Stack flex={1}>
        <LoadingPage message={loadingMessage} />
      </Stack>
    )
  }

  if (records.length === 0) {
    return (
      <MessagePage icon={emptyIcon} title={emptyTitle} message={emptyMessage} />
    )
  }

  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      style={{
        ...{ borderCollapse: 'separate', borderSpacing: `0 ${rowSpacing}px` },
        ...tableStyle,
      }}
    >
      {props.renderHeader && (
        <thead>
          <props.renderHeader />
        </thead>
      )}
      <tbody>
        {records.map((record, index) => (
          <tr key={itemKey(record)} style={{ width: '100%' }}>
            <td style={{ width: '100%' }}>
              {renderItem(record, records[index - 1])}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
