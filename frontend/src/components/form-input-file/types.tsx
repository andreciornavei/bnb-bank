import { Control, FieldValues } from 'react-hook-form'

export type FormInputFileProps = {
  name: string
  control: Control<FieldValues, any>
  error?: string
  bgImage?: string
  disabled?: boolean
}

export type FileContentSelectorProps = {
  disabled?: boolean
  base64Image?: string
  onRemove: () => void
}
