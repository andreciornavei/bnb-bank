import { useApi } from '@hooks/api'
import { useAuth } from '@hooks/auth'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { PurchasePageContext } from './context'
import { PurchasePageControllerProps } from './types'
import { useCallback, useMemo, useState } from 'react'
import { HttpMessageType } from '@type/http_error_type'
import { FormPurchaseType } from '@type/form_purchase_type'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'

export const PurchasePageController = ({
  children,
}: PurchasePageControllerProps): JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<HttpMessageType | undefined>(undefined)

  const handleSubmitForm = useCallback(
    (form: FormPurchaseType) => {
      setLoading(true)
      setError(undefined)
      api
        .instanceOf<TransactionsCustomerApi>(TransactionsCustomerApi)
        .purchase(form)
        .then((user) => [
          auth.setUser(user),
          navigate('/balance', { replace: true }),
        ])
        .catch((error) => [
          setError(error.response.data),
          enqueueSnackbar({
            message:
              error.response?.data?.error?.message || 'Authentication Error',
          }),
        ])
        .finally(() => setLoading(false))
    },
    [navigate, auth, api, enqueueSnackbar]
  )

  const state = useMemo(
    () => ({ error, loading, handleSubmitForm }),
    [error, loading, handleSubmitForm]
  )

  return (
    <PurchasePageContext.Provider value={state}>
      {children}
    </PurchasePageContext.Provider>
  )
}
