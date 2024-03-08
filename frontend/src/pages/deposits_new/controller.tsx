import axios from 'axios'
import { useApi } from '@hooks/api'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { DepositsNewPageContext } from './context'
import { useCallback, useMemo, useState } from 'react'
import { HttpMessageType } from '@type/http_error_type'
import { DepositsNewPageControllerProps } from './types'
import { FormDepositType } from '@type/form_deposit_type'
import { PresignedUrlType } from '@type/presigned_url_type'
import { TransactionsCustomerApi } from '@services/api/transactions_customer_api'

export const DepositsNewPageController = ({
  children,
}: DepositsNewPageControllerProps): JSX.Element => {
  const api = useApi()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [presigned, setPresigned] = useState<PresignedUrlType | undefined>(
    undefined
  )
  const [error, setError] = useState<HttpMessageType | undefined>(undefined)

  // 3ªChain - Create transaction with uploaded document
  const handleCreateDeposit = useCallback(
    (form: FormDepositType) => {
      api
        .instanceOf<TransactionsCustomerApi>(TransactionsCustomerApi)
        .deposit(form)
        .then(() => [navigate('/balance', { replace: true })])
        .catch((error) => [
          setError(error.response.data),
          enqueueSnackbar({
            message:
              error.response?.data?.error?.message || 'Authentication Error',
          }),
        ])
        .finally(() => setLoading(false))
    },
    [api, navigate, enqueueSnackbar]
  )

  // 2ªChain - Upload document to signed URL
  const handleUploadDocument = useCallback(
    (presign: PresignedUrlType, form: FormDepositType) => {
      // return if file not selected
      if (!form.file) {
        return [
          setLoading(false),
          setError({
            error: {
              message: 'Missing Document',
              fields: { document: ['You must to select the check picture'] },
            },
          }),
        ]
      }

      // extract document name and mount FormData
      const document = presign.fields?.key?.split('/')?.pop()
      const formData = new FormData()
      for (const fieldKey in presign?.fields || []) {
        formData.append(fieldKey, presign?.fields?.[fieldKey] || '')
      }
      formData.append('file', form.file)

      // call presigned url with file to upload
      const headers = { 'Content-Type': 'multipart/form-data' }
      axios
        .post(presign.url, formData, { headers })
        .then((r) => [handleCreateDeposit({ ...form, document })])
        .catch((e) => [
          setLoading(false),
          setError({
            error: {
              message: 'Upload Failed',
              fields: { document: ['Was not possible to upload document'] },
            },
          }),
        ])
    },
    [handleCreateDeposit]
  )

  // 1ªChain - Generage presigned URL
  const handleLoadPresignedUrl = useCallback(
    (form: FormDepositType) => {
      if (presigned) return handleUploadDocument(presigned, form)
      api
        .instanceOf<TransactionsCustomerApi>(TransactionsCustomerApi)
        .presignUpload({ filename: form.file?.name })
        .then((res) => [setPresigned(res), handleUploadDocument(res, form)])
        .catch((error) => [
          setLoading(false),
          setError(error.response.data),
          enqueueSnackbar({ message: 'Failed to handle upload document' }),
        ])
    },
    [
      api,
      presigned,
      setError,
      setPresigned,
      enqueueSnackbar,
      handleUploadDocument,
    ]
  )

  const handleSubmitForm = useCallback(
    (form: FormDepositType) => {
      setLoading(true)
      setError(undefined)
      handleLoadPresignedUrl(form)
    },
    [handleLoadPresignedUrl]
  )

  const state = useMemo(
    () => ({ error, loading, handleSubmitForm }),
    [error, loading, handleSubmitForm]
  )

  return (
    <DepositsNewPageContext.Provider value={state}>
      {children}
    </DepositsNewPageContext.Provider>
  )
}
