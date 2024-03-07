import { Body } from './styles'
import { useAuth } from '@hooks/auth'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { PurchasePageContext } from './context'
import { AppNavbar } from '@components/app-navbar'
import { SummaryButton } from '@components/summary-button'
import { useContextSelector } from 'use-context-selector'
import { formatAmount, formatDate } from '@utils/formatter'
import { Stack, Typography, useTheme } from '@mui/material'
import { FormInputText } from '@components/form-input-text'
import { FormInputLabel } from '@components/form-input-label'
import { Calendar, Money, Star } from '@phosphor-icons/react'
import { FormInputCurrency } from '@components/form-input-currency'

export const PurchasePageView = (): JSX.Element => {
  const { user } = useAuth()
  const { palette } = useTheme()

  const error = useContextSelector(PurchasePageContext, (s) => s.error)
  const loading = useContextSelector(PurchasePageContext, (s) => s.loading)

  const handleSubmitForm = useContextSelector(
    PurchasePageContext,
    (s) => s.handleSubmitForm
  )

  const { handleSubmit, control } = useForm<any>({
    defaultValues: { date: formatDate(new Date(), 'DD, MMMM, YYYY') },
  })

  return (
    <Stack direction="column" style={{ flex: 1 }}>
      <AppNavbar title="PURCHASE" variant="secondary" />
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
            endAdorment={
              <Typography variant="h5" color={palette.primary.main}>
                USD
              </Typography>
            }
          />
          <FormInputText
            label={<FormInputLabel icon={Calendar} label="DATE" />}
            size="large"
            name="date"
            control={control}
            disabled
            error={error?.error?.fields?.['date']?.[0]}
          />
          <FormInputText
            label={<FormInputLabel icon={Star} label="DESCRIPTION" />}
            size="large"
            name="description"
            placeholder="type here..."
            control={control}
            error={error?.error?.fields?.['description']?.[0]}
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
            ADD PURCHASE
          </Typography>
        </LoadingButton>
      </Body>
    </Stack>
  )
}
