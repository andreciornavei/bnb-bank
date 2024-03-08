import { SigninPageContext } from './context'
import { LoginFormType } from '@type/login_form_type'
import { Controller, useForm } from 'react-hook-form'
import { Button, Stack, Typography } from '@mui/material'
import { useContextSelector } from 'use-context-selector'

import {
  Body,
  Container,
  FormButton,
  FormDivider,
  FormInput,
  Header,
} from './styles'

export const SigninPageView = (): JSX.Element => {
  const { handleSubmit, control } = useForm<LoginFormType>()

  const error = useContextSelector(SigninPageContext, (s) => s.error)
  const loading = useContextSelector(SigninPageContext, (s) => s.loading)

  const handleSignup = useContextSelector(
    SigninPageContext,
    (s) => s.handleSignup
  )

  const handleSubmitForm = useContextSelector(
    SigninPageContext,
    (s) => s.handleSubmitForm
  )

  return (
    <Container>
      <Header>
        <Typography variant="h1" color="white">
          BNB Bank
        </Typography>
      </Header>
      <Body onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack direction="column" spacing={2} style={{ width: '100%' }}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <FormInput
                type="text"
                label="username"
                disabled={loading}
                autoCorrect="none"
                autoComplete="none"
                autoCapitalize="none"
                error={!!error?.error?.fields?.['username']}
                helperText={error?.error?.fields?.['username']?.[0]}
                sx={{ pb: !!error?.error?.fields?.['username'] ? 2 : 0 }}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                type="password"
                label="password"
                disabled={loading}
                autoCorrect="none"
                autoComplete="none"
                autoCapitalize="none"
                error={!!error?.error.fields?.['password']}
                helperText={error?.error.fields?.['password']?.[0]}
                sx={{ pb: !!error?.error.fields?.['password'] ? 2 : 0 }}
                {...field}
              />
            )}
          />
          <FormButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={loading}
          >
            SIGN IN
          </FormButton>
          <Stack alignItems="center">
            <FormDivider />
          </Stack>
          <Button
            variant="text"
            color="primary"
            size="medium"
            onClick={handleSignup}
          >
            Does not have an account?
          </Button>
        </Stack>
      </Body>
    </Container>
  )
}
