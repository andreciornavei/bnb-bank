import _ from 'lodash'
import produce from 'immer'
import { FlatListContext } from './context'
import { useScrollInfo } from '@hooks/useScrollInfo'
import { FlatListControllerProps, FlatListRefType } from './types'
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

export const FlatListController = ({
  listingRef,
  itemKey,
  limit = 10,
  handleFetch,
  ...props
}: Omit<
  FlatListControllerProps,
  'rowSpacing' | 'renderItem' | 'emptyMessage'
> & {
  listingRef: React.ForwardedRef<FlatListRefType>
}): JSX.Element => {
  const lockedLoading = useRef<boolean>(false)
  const { isPageBottom } = useScrollInfo()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [records, setRecords] = useState<Array<unknown>>([])
  const [endReached, setEndReached] = useState<boolean>(false)
  const [filters, setFilters] = useState<Record<string, string> | undefined>(
    undefined
  )

  const controlCursor = useMemo(() => {
    if (records.length === 0) return undefined
    const lastItem = _.get(records, records.length - 1)
    const lastItemCursor = itemKey(lastItem)
    if (!lastItemCursor) return undefined
    return lastItemCursor
  }, [itemKey, records])

  // expose refresh function outer the function
  useImperativeHandle(listingRef, () => ({
    refresh: (filters?: Record<string, string>) => handleRefresh(filters),
    updateRecord: (key: string, record: unknown) =>
      handleUpdateRecord(key, record),
  }))

  // determine a function to override an specific record by key
  const handleUpdateRecord = (key: string, record: unknown) => {
    setRecords(
      produce(records, (draft) => {
        if (draft) {
          draft = (draft || []).map((result) => {
            if (_.get(result, itemKey(record)) === key) return record
            else return result
          })
        }
      })
    )
  }

  // determine a function to refresh search results
  const handleRefresh = (filters?: Record<string, string>) => {
    setRecords([])
    setIsLoading(true)
    setFilters(filters)
    setEndReached(false)
    lockedLoading.current = true
    handleFetch(limit, undefined, filters)
      .then((results) => [
        setEndReached(results.length < limit),
        setRecords(results),
      ])
      .catch((e) => console.error('failed to fetch data'))
      .finally(() => [setIsLoading(false), (lockedLoading.current = false)])
  }

  const handleLoadMore = useCallback(() => {
    setIsLoading(true)
    lockedLoading.current = true
    handleFetch(limit, controlCursor, filters)
      .then((results) => [
        setEndReached(results.length < limit),
        setRecords((rest) => [...rest, ...results]),
      ])
      .catch((e) => console.error('failed to fetch data'))
      .finally(() => [setIsLoading(false), (lockedLoading.current = false)])
  }, [controlCursor, filters, limit, handleFetch])

  // initialize first fetch if enabled
  useEffect(() => {
    if (
      !lockedLoading.current &&
      !endReached &&
      (isPageBottom || records.length === 0)
    ) {
      handleLoadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlCursor, endReached, isPageBottom])

  const state = useMemo(
    () => ({ records, isLoading, endReached, handleLoadMore }),
    [isLoading, records, endReached, handleLoadMore]
  )

  return (
    <FlatListContext.Provider value={state}>
      {props.children}
    </FlatListContext.Provider>
  )
}
