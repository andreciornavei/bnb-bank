import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { DrawerItemProps } from './types'
import { useNavigate } from 'react-router-dom'

export const DrawerItem = (props: DrawerItemProps): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (props.onClick) props.onClick()
    else if (props.href) navigate(props.href)
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <props.icon size={24} color="white" style={{ opacity: 0.8 }} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="caption" fontWeight="bold" color="white">
            {props.label}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
