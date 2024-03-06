import { Body } from './styles'
import { useForm } from 'react-hook-form'
import { AppNavbar } from '@components/app-navbar'
import { Money, Star } from '@phosphor-icons/react'
import { ResumeButton } from '@components/resume-button'
import { FormInputText } from '@components/form-input-text'
import { FormInputLabel } from '@components/form-input-label'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { FormInputCurrency } from '@components/form-input-currency'
import { FormInputFile } from '@components/form-input-file'

export const DepositsNewPageView = (): JSX.Element => {
  const { palette } = useTheme()
  const { handleSubmit, control } = useForm()
  return (
    <Stack direction="column" style={{ flex: 1 }}>
      <AppNavbar title="CHECK DEPOSIT" variant="secondary" />
      <ResumeButton
        size="regular"
        resumeLabel="CURRENT BALANCE"
        resumeValue="$ 6320.00"
        color={palette.tertiary}
      />
      <Body onSubmit={() => handleSubmit}>
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
          />
          <FormInputFile name="document" control={control} />
        </Stack>
        <Button variant="contained" size="large" fullWidth>
          <Typography variant="body2" fontWeight="bold" py={1}>
            DEPOSIT CHECK
          </Typography>
        </Button>
      </Body>
    </Stack>
  )
}
