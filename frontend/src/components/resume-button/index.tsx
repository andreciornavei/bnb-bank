import {
  ResumeButtonIconDirectionMap,
  ResumeButtonProps,
  ResumeButtonSizeMap,
} from './types'
import { ResumeButtonWrapper } from './styles'
import { Stack, Typography } from '@mui/material'

export const ResumeButton = ({
  resumeLabel,
  resumeValue,
  actionLabel,
  onPress,
  color,
  size,
  actionIconDirection,
  ...props
}: ResumeButtonProps): JSX.Element => {
  return (
    <ResumeButtonWrapper backgroundColor={color.main}>
      <Stack
        spacing={2}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
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
      </Stack>
    </ResumeButtonWrapper>
  )
}
