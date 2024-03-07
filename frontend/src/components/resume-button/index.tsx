import {
  ResumeButtonIconDirectionMap,
  ResumeButtonProps,
  ResumeButtonSizeMap,
} from './types'
import { ResumeButtonWrapper } from './styles'
import { Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const ResumeButton = ({
  resumeLabel,
  resumeValue,
  actionLabel,
  onPress,
  href,
  color,
  size,
  actionIconDirection,
  ...props
}: ResumeButtonProps): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!!href) navigate(href)
    else if (!!onPress) onPress()
  }

  return (
    <ResumeButtonWrapper
      bg={color.main}
      onClick={handleClick}
      disableRipple={!href && !onPress}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        {resumeLabel && resumeValue && (
          <Stack direction="column" alignItems="flex-start">
            <Typography
              fontWeight="bold"
              color={color.contrastText}
              variant={ResumeButtonSizeMap[size].resumeLabelSize}
            >
              {resumeLabel}
            </Typography>
            <Typography
              fontWeight="500"
              color={color.contrastText}
              variant={ResumeButtonSizeMap[size].resumeValueSize}
            >
              {resumeValue}
            </Typography>
          </Stack>
        )}
        {actionLabel && (
          <Stack
            spacing={1}
            alignItems={
              ResumeButtonIconDirectionMap[actionIconDirection || 'vertical']
                .alignItems
            }
            direction={
              ResumeButtonIconDirectionMap[actionIconDirection || 'vertical']
                .direction
            }
          >
            {props.actionIcon && (
              <props.actionIcon
                size={21}
                weight="bold"
                color={color.contrastText}
              />
            )}
            <Typography
              color={color.contrastText}
              variant={ResumeButtonSizeMap[size].actionLabelSize}
              fontWeight="bold"
              textAlign="right"
            >
              {actionLabel}
            </Typography>
          </Stack>
        )}
      </Stack>
    </ResumeButtonWrapper>
  )
}
