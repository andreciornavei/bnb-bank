import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { FormInputFileProps } from './types'
import { FileContentSelector } from './components/file-content-selector'

export const FormInputFile = ({
  name,
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
        defaultValue=""
        render={({ field }) => (
          <>
            <input
              accept="image/*"
              id="file-target"
              type="file"
              value={field.value}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <FileContentSelector
              base64Image={base64Image}
              onRemove={() => setBase64Image(undefined)}
            />
          </>
        )}
      />
    </>
  )
}
