import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { FormInputFileProps } from './types'
import { FileContentSelector } from './components/file-content-selector'
import { FormHelperText, Stack } from '@mui/material'

export const FormInputFile = ({
  name,
  error,
  control,
}: FormInputFileProps): JSX.Element => {
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setBase64Image(e.target.result)
        }
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Stack direction="column">
            <input
              accept="image/*"
              id="file-target"
              type="file"
              style={{ display: 'none' }}
              {...field}
              onChange={(e) => [
                onChange(e?.target?.files?.[0]),
                handleFileChange(e),
              ]}
            />
            <FileContentSelector
              base64Image={base64Image}
              onRemove={() => [setBase64Image(undefined), onChange(undefined)]}
            />
            <FormHelperText error={!!error}>{error}</FormHelperText>
          </Stack>
        )}
      />
    </>
  )
}
