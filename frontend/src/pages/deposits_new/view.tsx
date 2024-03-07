import { Body } from './styles'
import { useAuth } from '@hooks/auth'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { formatAmount } from '@utils/formatter'
import { DepositsNewPageContext } from './context'
import { AppNavbar } from '@components/app-navbar'
import { Money, Star } from '@phosphor-icons/react'
import { SummaryButton } from '@components/summary-button'
import { useContextSelector } from 'use-context-selector'
import { Stack, Typography, useTheme } from '@mui/material'
import { FormInputFile } from '@components/form-input-file'
import { FormInputText } from '@components/form-input-text'
import { FormInputLabel } from '@components/form-input-label'
import { FormInputCurrency } from '@components/form-input-currency'

export const DepositsNewPageView = (): JSX.Element => {
  const { user } = useAuth()
  const { palette } = useTheme()
  const { handleSubmit, control } = useForm()

  const error = useContextSelector(DepositsNewPageContext, (s) => s.error)
  const loading = useContextSelector(DepositsNewPageContext, (s) => s.loading)
  const handleSubmitForm = useContextSelector(
    DepositsNewPageContext,
    (s) => s.handleSubmitForm
  )

  return (
    <Stack direction="column" style={{ flex: 1 }}>
      <AppNavbar title="CHECK DEPOSIT" variant="secondary" />
      <SummaryButton
        size="regular"
        summaryLabel="CURRENT BALANCE"
        summaryValue={formatAmount(user?.balance || 0)}
        color={palette.tertiary}
      />
      <Body onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack
          py={3}
          spacing={4}
          direction="column"
          sx={{ width: '100%', flex: 1 }}
        >
          <FormInputCurrency
            label={<FormInputLabel icon={Money} label="AMOUNT" />}
            size="large"
            name="amount"
            prefix="$ "
            control={control}
            error={error?.error?.fields?.['amount']?.[0]}
            helperText="* The money will be deposited in your account once the check is accepted."
            endAdorment={
              <Typography variant="h5" color={palette.primary.main}>
                USD
              </Typography>
            }
          />
          <FormInputText
            label={<FormInputLabel icon={Star} label="DESCRIPTION" />}
            size="large"
            name="description"
            placeholder="type here..."
            control={control}
            error={error?.error?.fields?.['description']?.[0]}
          />
          <FormInputFile
            name="file"
            control={control}
            error={error?.error?.fields?.['document']?.[0]}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          <Typography variant="body2" fontWeight="bold" py={1}>
            DEPOSIT CHECK
          </Typography>
        </LoadingButton>
      </Body>
    </Stack>
  )
}
