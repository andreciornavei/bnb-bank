import { FlatListContext } from '../context'
import { Loading } from '@components/loading'
import { CheckCircle, PlusCircle } from '@phosphor-icons/react'
import { useContextSelector } from 'use-context-selector'
import { Button, Stack, Typography, useTheme } from '@mui/material'

export const FlatListFooter = (): JSX.Element | null => {
  const { palette } = useTheme()
  const records = useContextSelector(FlatListContext, (s) => s.records)
  const isLoading = useContextSelector(FlatListContext, (s) => s.isLoading)
  const endReached = useContextSelector(FlatListContext, (s) => s.endReached)
  const handleLoadMore = useContextSelector(
    FlatListContext,
    (s) => s.handleLoadMore
  )

  if (records.length === 0) return null

  if (!!isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" py={2}>
        <Loading message="Loading more..." />
      </Stack>
    )
  }

  if (!!endReached) {
    return (
      <Stack
        py={2}
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircle weight="duotone" size={21} color={palette.primary.main} />
        <Typography variant="caption" fontWeight="bold" color="black">
          No more records to load.
        </Typography>
      </Stack>
    )
  }

  if (!isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" py={2}>
        <Button
          variant="contained"
          onClick={handleLoadMore}
          sx={{ borderRadius: 30, paddingLeft: 1 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <PlusCircle
              weight="duotone"
              size={21}
              color={palette.common.white}
            />
            <Typography variant="caption" fontWeight="bold" color="white">
              Load more records
            </Typography>
          </Stack>
        </Button>
      </Stack>
    )
  }

  return null
}
