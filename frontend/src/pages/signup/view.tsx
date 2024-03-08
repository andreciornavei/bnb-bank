import { Button, Stack, Typography } from '@mui/material'
import {
  Body,
  Container,
  FormButton,
  FormDivider,
  FormInput,
  Header,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { SignupPageContext } from './context'
import { Controller, useForm } from 'react-hook-form'

export const SignupPageView = (): JSX.Element => {
  const { handleSubmit, control } = useForm()
  const error = useContextSelector(SignupPageContext, (s) => s.error)
  const loading = useContextSelector(SignupPageContext, (s) => s.loading)

  const handleSubmitForm = useContextSelector(
    SignupPageContext,
    (s) => s.handleSubmitForm
  )

  const handleSignin = useContextSelector(
    SignupPageContext,
    (s) => s.handleSignin
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
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                type="email"
                label="email"
                disabled={loading}
                autoCorrect="none"
                autoComplete="none"
                autoCapitalize="none"
                error={!!error?.error?.fields?.['email']}
                helperText={error?.error?.fields?.['email']?.[0]}
                sx={{ pb: !!error?.error?.fields?.['email'] ? 2 : 0 }}
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
                error={!!error?.error?.fields?.['password']}
                helperText={error?.error?.fields?.['password']?.[0]}
                sx={{ pb: !!error?.error?.fields?.['password'] ? 2 : 0 }}
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
            SIGN UP
          </FormButton>
          <Stack alignItems="center">
            <FormDivider />
          </Stack>
          <Button
            variant="text"
            color="primary"
            size="medium"
            onClick={handleSignin}
          >
            Already have an account?
          </Button>
        </Stack>
      </Body>
    </Container>
  )
}
