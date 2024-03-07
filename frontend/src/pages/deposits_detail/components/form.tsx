import { Body } from './../styles'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { DepositsDetailPageContext } from '../context'
import { useContextSelector } from 'use-context-selector'
import { Stack, Typography, useTheme } from '@mui/material'
import { FormInputFile } from '@components/form-input-file'
import { FormInputText } from '@components/form-input-text'
import { FormInputLabel } from '@components/form-input-label'
import { TransactionEntity } from '@entities/TransactionEntity'
import { FormInputCurrency } from '@components/form-input-currency'
import { TransactionStatusEnum } from '@enums/transaction_status_enum'

import {
  User,
  Money,
  XCircle,
  CaretRight,
  CheckCircle,
  EnvelopeSimple,
  IdentificationBadge,
} from '@phosphor-icons/react'

type Props = { transaction: TransactionEntity }
export const DepositsDetailForm = ({ transaction }: Props): JSX.Element => {
  const { palette } = useTheme()
  const { handleSubmit, control } = useForm<Partial<TransactionEntity>>({
    defaultValues: transaction || {},
  })
  const presignedUrl = useContextSelector(
    DepositsDetailPageContext,
    (s) => s.presignedUrl
  )
  const updating = useContextSelector(
    DepositsDetailPageContext,
    (s) => s.updating
  )
  const handleTransactionControl = useContextSelector(
    DepositsDetailPageContext,
    (s) => s.handleTransactionControl
  )

  return (
    <Body onSubmit={handleSubmit(() => {})}>
      <Stack
        py={3}
        spacing={4}
        direction="column"
        sx={{ width: '100%', flex: 1 }}
      >
        <FormInputText
          label={<FormInputLabel icon={User} label="CUSTOMER" />}
          disabled
          size="large"
          name="user_username"
          control={control}
          disableUnderline
        />
        <FormInputText
          label={
            <FormInputLabel icon={EnvelopeSimple} label="CUSTOMER EMAIL" />
          }
          disabled
          size="large"
          name="user_email"
          control={control}
          disableUnderline
          endAdorment={<CaretRight weight="bold" size={21} />}
        />
        <FormInputText
          label={<FormInputLabel icon={IdentificationBadge} label="ACCOUNT" />}
          disabled
          size="large"
          name="user_id"
          control={control}
          disableUnderline
          endAdorment={<CaretRight weight="bold" size={21} />}
        />
        <FormInputCurrency
          label={<FormInputLabel icon={Money} label="REPORTED AMOUNT" />}
          disabled
          size="large"
          name="amount"
          prefix="$ "
          control={control}
          disableUnderline
          endAdorment={
            <Typography variant="h5" color={palette.primary.main}>
              USD
            </Typography>
          }
        />
        <FormInputFile
          name="file"
          bgImage={presignedUrl?.url}
          control={control}
          disabled
        />
      </Stack>
      <Stack direction="row" spacing={2} width="100%">
        <LoadingButton
          size="large"
          sx={{ flex: 1 }}
          variant="outlined"
          loading={updating}
          onClick={() =>
            handleTransactionControl(TransactionStatusEnum.rejected)
          }
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <XCircle weight="duotone" size={21} />
            <Typography variant="body2" fontWeight="bold" py={1}>
              REJECT
            </Typography>
          </Stack>
        </LoadingButton>
        <LoadingButton
          size="large"
          sx={{ flex: 1 }}
          variant="contained"
          loading={updating}
          onClick={() =>
            handleTransactionControl(TransactionStatusEnum.approved)
          }
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle weight="duotone" size={21} />
            <Typography variant="body2" fontWeight="bold" py={1}>
              ACCEPT
            </Typography>
          </Stack>
        </LoadingButton>
      </Stack>
    </Body>
  )
}
