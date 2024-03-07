import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FormInputFileProps } from './types'
import { FileContentSelector } from './components/file-content-selector'
import { FormHelperText, Stack } from '@mui/material'

export const FormInputFile = ({
  name,
  error,
  control,
  bgImage,
  disabled,
}: FormInputFileProps): JSX.Element => {
  const ref = useRef<any>()
  const [base64Image, setBase64Image] = useState<string | undefined>(bgImage)

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

  useEffect(() => {
    if (!!bgImage) setBase64Image(bgImage)
  }, [bgImage])

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Stack direction="column">
            <input
              {...field}
              accept="image/*"
              id="file-target"
              type="file"
              disabled={disabled}
              value={value?.filename}
              style={{ display: 'none' }}
              ref={ref}
              onChange={(e) => [
                onChange(e?.target?.files?.[0]),
                handleFileChange(e),
              ]}
            />
            <FileContentSelector
              disabled={disabled}
              base64Image={base64Image}
              onRemove={() => [
                onChange(undefined),
                (ref.current.value = ''),
                setBase64Image(undefined),
              ]}
            />
            <FormHelperText error={!!error}>{error}</FormHelperText>
          </Stack>
        )}
      />
    </>
  )
}
