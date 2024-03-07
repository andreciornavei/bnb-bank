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
import { SigninPageContext } from './context'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormType } from '@type/login_form_type'

export const SigninPageView = (): JSX.Element => {
  const { handleSubmit, control } = useForm<LoginFormType>()

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
              <FormInput type="text" label="username" {...field} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput type="password" label="password" {...field} />
            )}
          />
          <FormButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
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
