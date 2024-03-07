import { Stack } from '@mui/material'
import { FlatListItems } from './components/items'
import { FlatListProps } from './types'

export const FlatListView = ({
  renderItem,
  renderHeader,
  rowSpacing = 10,
  tableStyle = {},
  emptyMessage,
  loadingMessage,
}: Pick<
  FlatListProps,
  | 'rowSpacing'
  | 'renderItem'
  | 'renderHeader'
  | 'emptyMessage'
  | 'tableStyle'
  | 'loadingMessage'
>): JSX.Element => {
  return (
    <Stack direction="column" sx={{ py: 0, pl: 0, pr: 0 }} spacing={3} flex={1}>
      <Stack direction="column" spacing={2} flex={1}>
        <FlatListItems
          tableStyle={tableStyle}
          rowSpacing={rowSpacing}
          renderItem={renderItem}
          renderHeader={renderHeader}
          emptyMessage={emptyMessage}
          loadingMessage={loadingMessage}
        />
      </Stack>
    </Stack>
  )
}
