import { FormInputTextSizes } from './types'

export const FormInputMapSizes: Record<
  FormInputTextSizes,
  Record<'menu' | 'item' | 'label', Record<string, unknown>>
> = {
  large: {
    menu: { marginTop: '0px !important' },
    item: { py: 3 },
    label: { fontSize: '16px' },
  },
  medium: {
    menu: { marginTop: '3px !important' },
    item: { py: 2 },
    label: { fontSize: '14px' },
  },
  small: {
    menu: { marginTop: '3px !important' },
    item: { py: 2 },
    label: { fontSize: '14px' },
  },
}
