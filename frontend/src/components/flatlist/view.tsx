import { Stack } from '@mui/material'
import { FlatListItems } from './components/items'
import { FlatListProps } from './types'
import { FlatListFooter } from './components/footer'

export const FlatListView = ({
  itemKey,
  renderItem,
  renderHeader,
  rowSpacing = 10,
  tableStyle = {},
  emptyIcon,
  emptyTitle,
  emptyMessage,
  loadingMessage,
}: Pick<
  FlatListProps,
  | 'rowSpacing'
  | 'itemKey'
  | 'renderItem'
  | 'renderHeader'
  | 'emptyIcon'
  | 'emptyTitle'
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
          itemKey={itemKey}
          renderItem={renderItem}
          renderHeader={renderHeader}
          emptyIcon={emptyIcon}
          emptyTitle={emptyTitle}
          emptyMessage={emptyMessage}
          loadingMessage={loadingMessage}
        />
        <FlatListFooter />
      </Stack>
    </Stack>
  )
}
