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

export const SigninPageView = (): JSX.Element => {
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
      <Body onSubmit={handleSubmitForm}>
        <Stack direction="column" spacing={2} style={{ width: '100%' }}>
          <FormInput type="text" label="username" />
          <FormInput type="password" label="password" size="medium" />
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
