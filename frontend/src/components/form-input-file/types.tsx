import { Control, FieldValues } from 'react-hook-form'

export type FormInputFileProps = {
  name: string
  control: Control<FieldValues, any>
  error?: string
}

export type FileContentSelectorProps = {
  base64Image?: string
  onRemove: () => void
}
