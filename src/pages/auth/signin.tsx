import { Button, Card, Container, Grid, Spacer, Text, useTheme } from '@nextui-org/react'
import type { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { InferGetServerSidePropsType } from 'next/types'
import { useState } from 'react'
import LoginButton from '../../components/Login/LoginButton'
import LoginField from '../../components/Login/LoginField'
import type { CustomErrorMessage } from '../../interfaces/constants'
import { errorTitle, Toast } from '../../utils/swal'
import { trpc } from '../../utils/trpc'
import { authOpts } from '../api/auth/[...nextauth]'

const customErrors: CustomErrorMessage = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked: 'The email on the account is already linked, sign in with different one',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context
  const [providers, session] = await Promise.all([
    await getProviders(),
    await unstable_getServerSession(req, res, authOpts),
  ])
  if (session !== null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      providers,
    },
  }
}

function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { query } = router
  const { isDark } = useTheme()
  const [fieldValue, setFieldValue] = useState('')
  const [errorField, setErrorField] = useState([])
  const [shown, setShown] = useState(false)
  const { isLoading, isError, error } = trpc.signin.submit.useMutation()

  if (query.error && !Array.isArray(query.error) && !shown) {
    const errorQuery = query.error as keyof typeof customErrors
    const text = customErrors[errorQuery]
    Toast.fire({
      icon: 'error',
      title: errorTitle(text),
    })
    setShown(true)
  }

  if (isError) {
    Toast.fire({
      icon: 'error',
      title: errorTitle(error.message),
    })
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Grid.Container
        justify='center'
        alignItems='center'
        css={{
          minHeight: '100vh',
          height: '100%',
        }}
      >
        <Grid
          xs={10}
          sm={8}
          md={5}
          lg={4}
          xl={3}
        >
          <Card variant={isDark ? 'bordered' : 'shadow'}>
            <Card.Header
              css={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                letterSpacing: '2px',
              }}
            >
              <Text
                h4
                transform='uppercase'
                weight='bold'
                css={{
                  '@xs': {
                    letterSpacing: '$wider',
                  },
                  '@lg': {
                    letterSpacing: '$widest',
                  },
                }}
              >
                Pixiv clone
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Container fluid>
                {providers &&
                  Object.values(providers).map(
                    provider =>
                      provider.type !== 'email' && (
                        <Button
                          key={provider.id}
                          bordered
                          ghost
                          color='gradient'
                          css={{
                            my: '$5',
                            w: '100%',
                            fontSize: '$lg',
                            letterSpacing: '$wider',
                          }}
                          onClick={() => signIn(provider.id)}
                        >
                          Sign in with {provider.name}
                        </Button>
                      )
                  )}
              </Container>
              <Spacer y={0.5} />
              <Text
                h5
                i
                transform='uppercase'
                css={{
                  textAlign: 'center',
                }}
              >
                or
              </Text>
              <Spacer y={0.5} />
              <Text
                h5
                i
                transform='uppercase'
                css={{
                  textAlign: 'center',
                }}
              >
                Sign in with email
              </Text>
              <Spacer y={1} />
              <Container
                fluid
                display='flex'
              >
                <LoginField
                  name={'email'}
                  initialValue={fieldValue}
                  helperText={errorField[0]}
                  labelPlaceholder={'Email'}
                  hasError={errorField.length !== 0}
                  onChange={e => setFieldValue(e.target.value)}
                  clearValue={() => setErrorField([])}
                />

                <LoginButton
                  loading={isLoading}
                  onClickHandler={() =>
                    signIn('email', {
                      email: fieldValue,
                    })
                  }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Signin
