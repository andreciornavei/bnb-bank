import React from 'react'
import { FlatListView } from './view'
import { FlatListController } from './controller'
import { FlatListProps, FlatListRefType } from './types'

export const FlatList = React.forwardRef<FlatListRefType, FlatListProps>(
  (
    {
      rowSpacing,
      renderItem,
      emptyMessage,
      loadingMessage,
      tableStyle,
      renderHeader,
      ...props
    }: FlatListProps,
    ref
  ): JSX.Element => {
    return (
      <FlatListController {...props} listingRef={ref}>
        <FlatListView
          tableStyle={tableStyle}
          rowSpacing={rowSpacing}
          renderItem={renderItem}
          renderHeader={renderHeader}
          emptyMessage={emptyMessage}
          loadingMessage={loadingMessage}
        />
      </FlatListController>
    )
  }
)
