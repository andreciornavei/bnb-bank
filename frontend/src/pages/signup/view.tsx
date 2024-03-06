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

export const SignupPageView = (): JSX.Element => {
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
      <Body>
        <Stack direction="column" spacing={2} style={{ width: '100%' }}>
          <FormInput type="text" label="username" />
          <FormInput type="email" label="email" />
          <FormInput type="password" label="password" size="medium" />
          <FormButton variant="contained" color="primary" size="large">
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
