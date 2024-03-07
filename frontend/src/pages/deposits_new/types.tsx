import { FormDepositType } from '@type/form_deposit_type'
import { HttpMessageType } from '@type/http_error_type'

export type DepositsNewPageProps = {}

export type DepositsNewPageControllerProps = DepositsNewPageProps & {
  children: JSX.Element
}

export type DepositsNewPageContextProps = {
  loading: boolean
  error: HttpMessageType | undefined
  handleSubmitForm: (form: FormDepositType) => void
}
