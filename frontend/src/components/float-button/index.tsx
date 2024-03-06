import { SpeedDial } from '@mui/material'
import { Plus } from '@phosphor-icons/react'
import { FloatButtonProps } from './types'
import { useNavigate } from 'react-router-dom'

export const FloatButton = ({
  href,
  onPress,
}: FloatButtonProps): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!!href) navigate(href)
    else if (!!onPress) onPress()
  }

  return (
    <SpeedDial
      onClick={handleClick}
      ariaLabel="add new item"
      sx={{ position: 'absolute', bottom: 24, right: 24, boxShadow: 'none' }}
      icon={<Plus size={24} weight="bold" />}
    />
  )
}
