import { Stack, Typography, useTheme } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { FolderSimpleDashed } from '@phosphor-icons/react'

export const NotFoundedPageView = (): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Stack direction="column" flex={1}>
      <AppNavbar title="NOT FOUNDED" variant="secondary" />
      <Stack
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          flex={1}
          spacing={2}
          maxWidth={300}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <FolderSimpleDashed
            size={64}
            weight="duotone"
            color={palette.primary.main}
          />
          <Typography variant="body1" fontWeight="bold">
            Page under construction
          </Typography>
          <Typography variant="body2" textAlign="center">
            This page is not available yet, return in some days to see new
            amazing things happeng...
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
