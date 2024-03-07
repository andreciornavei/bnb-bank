import { FormPurchaseType } from '@type/form_purchase_type'
import { HttpMessageType } from '@type/http_error_type'

export type PurchasePageProps = {}

export type PurchasePageControllerProps = PurchasePageProps & {
  children: JSX.Element
}

export type PurchasePageContextProps = {
  loading: boolean
  error: HttpMessageType | undefined
  handleSubmitForm: (form: FormPurchaseType) => void
}
