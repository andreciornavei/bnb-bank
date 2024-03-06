import { Typography } from '@mui/material'
import { DrawerHeadWrapper } from './styles'

export const DrawerHead = (): JSX.Element => {
  return (
    <DrawerHeadWrapper>
      <Typography variant="h5" color="white">
        BNB Bank
      </Typography>
    </DrawerHeadWrapper>
  )
}
