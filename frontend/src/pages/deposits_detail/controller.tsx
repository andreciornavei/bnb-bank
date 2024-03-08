import { useCallback, useEffect, useMemo, useState } from 'react'
import { useApi } from '@hooks/api'
import { useSnackbar } from 'notistack'
import { DepositsDetailPageContext } from './context'
import { useNavigate, useParams } from 'react-router-dom'
import { DepositsDetailPageControllerProps } from './types'
import { TransactionEntity } from '@entities/TransactionEntity'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'
import { TransactionsAdminApi } from '@services/api/transactions_admin_api'
import { PresignedUrlType } from '@type/presigned_url_type'

export const DepositsDetailPageController = ({
  children,
}: DepositsDetailPageControllerProps): JSX.Element => {
  const api = useApi()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [transaction, setTransaction] = useState<TransactionEntity | undefined>(
    undefined
  )
  const [presignedUrl, setPresignedUrl] = useState<
    PresignedUrlType | undefined
  >(undefined)

  const handleLoadDocument = useCallback(
    (id: string | undefined) => {
      if (!id) return
      api
        .instanceOf<TransactionsAdminApi>(TransactionsAdminApi)
        .documentUrl({ transaction_id: id })
        .then(setPresignedUrl)
        .catch((error) => console.error('failed to load document'))
    },
    [api]
  )

  const handleLoadTransaction = useCallback(
    (id: string | undefined) => {
      if (!id) return
      setLoading(true)
      setUpdating(false)
      api
        .instanceOf<TransactionsAdminApi>(TransactionsAdminApi)
        .list({ id: id })
        .then(([transaction]) => setTransaction(transaction))
        .catch((error) => console.error('failed to load transaction'))
        .finally(() => setLoading(false))
    },
    [api]
  )

  const handleTransactionControl = useCallback(
    (status: TransactionStatusEnum) => {
      if (!id) return
      setLoading(false)
      setUpdating(true)
      api
        .instanceOf<TransactionsAdminApi>(TransactionsAdminApi)
        .updateStatus({
          id: id,
          status: status,
        })
        .then(() => [navigate('/deposits/control', { replace: true })])
        .catch((error) => [
          enqueueSnackbar({
            message: error.response?.data?.error?.message || 'Operation Failed',
          }),
        ])
        .finally(() => setUpdating(false))
    },
    [id, api, enqueueSnackbar, navigate]
  )

  useEffect(() => {
    handleLoadTransaction(id)
    handleLoadDocument(id)
  }, [id, handleLoadTransaction, handleLoadDocument])

  const state = useMemo(
    () => ({
      updating,
      loading,
      transaction,
      presignedUrl,
      handleTransactionControl,
    }),
    [updating, loading, transaction, presignedUrl, handleTransactionControl]
  )
  return (
    <DepositsDetailPageContext.Provider value={state}>
      {children}
    </DepositsDetailPageContext.Provider>
  )
}
