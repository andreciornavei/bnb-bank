import {
  FormInputFileSelectable,
  FormInputFileTrash,
  FormInputFileWrapper,
} from '../styles'
import { FileContentSelectorProps } from '../types'
import { CloudArrowUp, Trash } from '@phosphor-icons/react'
import { Stack, Typography, useTheme } from '@mui/material'

export const FileContentSelector = ({
  base64Image,
  disabled,
  onRemove,
}: FileContentSelectorProps): JSX.Element => {
  const { palette } = useTheme()

  if (!!base64Image) {
    return (
      <FormInputFileWrapper backgroundImage={base64Image}>
        {!disabled && (
          <FormInputFileTrash onClick={onRemove}>
            <Trash size={18} color={palette.common.white} weight="duotone" />
          </FormInputFileTrash>
        )}
      </FormInputFileWrapper>
    )
  }

  return (
    <FormInputFileSelectable htmlFor="file-target">
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={1}
      >
        <CloudArrowUp
          weight="duotone"
          size={32}
          color={palette.secondary.main}
        />
        <Typography color={palette.secondary.main}>
          UPLOAD CHECK PICTURE
        </Typography>
      </Stack>
    </FormInputFileSelectable>
  )
}
