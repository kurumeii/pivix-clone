import { Button, Card, Col, Container, FormElement, Grid, Input, Loading, Row, Spacer, Text } from '@nextui-org/react'
import { GetServerSidePropsContext } from 'next'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next/types'
import { authOpts } from 'pages/api/auth/[...nextauth]'
import { Toast } from 'pages/_app'
import { ChangeEvent, useEffect, useState } from 'react'
import { trpc } from 'utils/trpc'
import md5 from 'md5'
import LoginField from 'components/Login/LoginField'
import LoginButton from 'components/Login/LoginButton'

const customErrors = {
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
} as const

type ErrorType = keyof typeof customErrors
type ErrorMsg = typeof customErrors[ErrorType]
type ErrorField = {
  email: string[]
  password: string[]
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const [providers, session] = await Promise.all([getProviders(), unstable_getServerSession(req, res, authOpts)])
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
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
  const [fieldValue, setFieldValue] = useState({
    email: '',
    password: '',
  })
  const [errorField, setErrorField] = useState<ErrorField>({
    email: [],
    password: [],
  })

  const { mutateAsync, isLoading, isError, error } = trpc.signin.submit.useMutation()

  if (query.error && !Array.isArray(query.error)) {
    const errorQuery: ErrorType = query.error as ErrorType
    const text = customErrors[errorQuery]
    Toast.fire({
      icon: 'error',
      title: `<h4 style='color: #d63051 !important'>There has been an error: </h4>`,
      text,
    })
  }

  const changeField = (event: ChangeEvent<FormElement>) =>
    setFieldValue(prev => {
      return {
        ...prev,
        [event.currentTarget.name]: event.currentTarget.value,
      }
    })

  const submitForm = async () => {
    mutateAsync({
      email: fieldValue.email,
      password: md5(fieldValue.password),
    })
  }

  useEffect(() => {
    if (isError) {
      if (!error.data?.zodError) {
        return Toast.fire({
          icon: 'error',
          title: `<h4 style='color: #d63051 !important'>There has been an error: ${error.data?.code}</h4>`,
          text: error.message,
        })
      }
      const fieldErrors = error.data?.zodError?.fieldErrors
      setErrorField(prev => {
        return {
          email: fieldErrors['email'] || [],
          password: fieldErrors['password'] || [],
        }
      })
    }
  }, [error, isError])

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
          <Card variant='bordered'>
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
                  Object.values(providers).map(provider => (
                    <Button
                      key={provider.id}
                      bordered
                      ghost
                      color='gradient'
                      css={{
                        my: '$5',
                        w: '100%',
                      }}
                      onPress={() => signIn(provider.id)}
                    >
                      <Text
                        size={'$lg'}
                        css={{ letterSpacing: '$wider' }}
                      >
                        Sign in with {provider.name}
                      </Text>
                    </Button>
                  ))}
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
                Sign in with account
              </Text>
              <Spacer y={1} />
              <Container
                fluid
                display='flex'
              >
                {Object.keys(fieldValue).map((field, i) => (
                  <LoginField
                    key={i}
                    name={field}
                    initialValue={fieldValue[field]}
                    helperText={errorField[field][0]}
                    labelPlaceholder={field.toUpperCase()}
                    status={errorField[field].length === 0}
                    onChange={event => changeField(event)}
                  />
                ))}
                <LoginButton
                  loading={isLoading}
                  onPressHandler={submitForm}
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
