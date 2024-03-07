import axios from 'axios'
import { useApi } from '@hooks/api'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { DepositsNewPageContext } from './context'
import { useCallback, useMemo, useState } from 'react'
import { HttpMessageType } from '@type/http_error_type'
import { DepositsNewPageControllerProps } from './types'
import { FormDepositType } from '@type/form_deposit_type'
import { TransactionsApi } from '@services/api/transactions_api'

export const DepositsNewPageController = ({
  children,
}: DepositsNewPageControllerProps): JSX.Element => {
  const api = useApi()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadUrl, setUploadUrl] = useState<string | undefined>(undefined)
  const [error, setError] = useState<HttpMessageType | undefined>(undefined)

  // 3ªChain - Create transaction with uploaded document
  const handleCreateDeposit = useCallback(
    (form: FormDepositType) => {
      api
        .instanceOf<TransactionsApi>(TransactionsApi)
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
    (url: string, form: FormDepositType) => {
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
      const document = new URL(url).pathname.replace(/\/$/, '').split('/').pop()
      const formdata = new FormData()
      formdata.append('file', form.file)

      // call presigned url with file to upload
      axios
        .put(url, formdata, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => [
          console.log('uploaded successfully'),
          handleCreateDeposit({ ...form, document }),
        ])
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
      if (uploadUrl) return handleUploadDocument(uploadUrl, form)
      api
        .instanceOf<TransactionsApi>(TransactionsApi)
        .presignUpload()
        .then((res) => [
          setUploadUrl(res.url),
          handleUploadDocument(res.url, form),
        ])
        .catch((error) => [
          setLoading(false),
          setError(error.response.data),
          enqueueSnackbar({ message: 'Failed to handle upload document' }),
        ])
    },
    [
      api,
      uploadUrl,
      setError,
      setUploadUrl,
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
