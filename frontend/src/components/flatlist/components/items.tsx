import { Stack } from '@mui/material'
import { FlatListContext } from '../context'
import { File } from '@phosphor-icons/react'
import { LoadingPage } from '@components/loading-page'
import { MessagePage } from '@components/message-page'
import { useContextSelector } from 'use-context-selector'

type Props = {
  loading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  displayRecords?: unknown[]
  rowSpacing?: number
  tableStyle?: React.CSSProperties | undefined
  renderItem: (item: any, prevItem: any) => JSX.Element | JSX.Element[]
  renderHeader?: () => JSX.Element
}
export const FlatListItems = ({
  emptyMessage = 'Empty',
  loadingMessage = 'Loading results...',
  rowSpacing = 10,
  tableStyle = {},
  renderItem,
  ...props
}: Props): JSX.Element | null => {
  const isLoading = useContextSelector(FlatListContext, (s) => s.isLoading)
  const records = useContextSelector(FlatListContext, (s) => s.records)

  if (!!isLoading) {
    return (
      <Stack flex={1}>
        <LoadingPage message={loadingMessage} />
      </Stack>
    )
  }

  if (records.length === 0) {
    return <MessagePage icon={File} title="Empty" message={emptyMessage} />
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
        {records.map((record, index) => renderItem(record, records[index - 1]))}
      </tbody>
    </table>
  )
}
