import type { FormElement } from '@nextui-org/react'
import { Button, Card, Container, Grid, Spacer, Text } from '@nextui-org/react'
import md5 from 'md5'
import type { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { InferGetServerSidePropsType } from 'next/types'

import type { ChangeEvent } from 'react'
import { useState } from 'react'
import LoginButton from '../../components/Login/LoginButton'
import LoginField from '../../components/Login/LoginField'
import { trpc } from '../../utils/trpc'
import { authOpts } from '../api/auth/[...nextauth]'
import { Toast } from '../_app'

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

interface FieldValue {
  'email': string
  'password': string
}

interface ErrorField {
  'email': string[]
  'password': string[]
}

const initFieldVal: FieldValue = {
  email: '',
  password: '',
}

const initErrorField: ErrorField = {
  email: [],
  password: [],
}

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const providers = await getProviders()
  const session = await unstable_getServerSession(req, res, authOpts)
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
  const [fieldValue, setFieldValue] = useState(initFieldVal)
  const [errorField, setErrorField] = useState(initErrorField)

  const { mutate, isLoading, reset } = trpc.signin.submit.useMutation({
    onError(error) {
      if (!error.data?.zodError) {
        return Toast.fire({
          icon: 'error',
          title: `<h4 style='color: #d63051 !important'>There has been an error: ${error.data?.code}</h4>`,
          text: error.message,
        })
      }
      const fieldErrors = error.data?.zodError?.fieldErrors
      setErrorField({
        email: fieldErrors['email'] || [],
        password: fieldErrors['password'] || [],
      })
    },
  })

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
        [event.target.name]: event.target.value,
      }
    })

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
                    initialValue={fieldValue[field as keyof FieldValue]}
                    helperText={errorField[field as keyof ErrorField][0]}
                    labelPlaceholder={field.toUpperCase()}
                    status={errorField[field as keyof ErrorField].length === 0}
                    onChange={event => changeField(event)}
                  />
                ))}
                <LoginButton
                  loading={isLoading}
                  onPressHandler={() => {
                    mutate({
                      email: fieldValue.email,
                      password: md5(fieldValue.password),
                    })
                    reset()
                  }}
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
