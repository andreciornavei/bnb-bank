import { Stack } from '@mui/material'
import { AppNavbar } from '@components/app-navbar'
import { MessagePage } from '@components/message-page'
import { FolderSimpleDashed } from '@phosphor-icons/react'

export const NotFoundedPageView = (): JSX.Element => {
  return (
    <Stack direction="column" flex={1}>
      <AppNavbar title="NOT FOUNDED" variant="secondary" />
      <MessagePage
        icon={FolderSimpleDashed}
        title="Page Not Founded"
        message="This page is under construction or is not available to your role, return in some days to see new amazing things happen."
      />
    </Stack>
  )
}
