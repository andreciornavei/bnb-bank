import { Stack, Typography } from '@mui/material'
import { DrawerHeadWrapper } from './styles'
import { useAuth } from '@hooks/auth'

export const DrawerHeader = (): JSX.Element => {
  const auth = useAuth()
  return (
    <DrawerHeadWrapper>
      <Stack direction="column">
        <Typography variant="h5" color="white">
          BNB Bank
        </Typography>
        <Stack direction="column">
          <Typography
            variant="caption"
            color="white"
            lineHeight={1}
            fontWeight="bold"
          >
            {auth.user?.username || 'unknown'}
          </Typography>
          <Typography variant="caption" color="white" lineHeight={1}>
            {auth.user?._id || 'unknown'}
          </Typography>
        </Stack>
      </Stack>
    </DrawerHeadWrapper>
  )
}
