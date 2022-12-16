import { Button, Card, Grid, Text } from '@nextui-org/react'
import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next/types'
import { Toast } from 'pages/_app'

const errors = {
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

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { query } = router
  if (query.error) {
    Toast.fire({
      icon: 'error',
      title: `<h4 style='color: #d63051 !important'>There has been an error</h4>`,
      text: errors[query.error],
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
          md={8}
          lg={6}
        >
          <Card
            variant='bordered'
            css={{
              w: '100%',
            }}
          >
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
            <Card.Body
              css={{
                py: '$10',
                gap: '$10',
              }}
            >
              {providers &&
                Object.values(providers).map(provider => (
                  <Button
                    key={provider.id}
                    shadow
                    ghost
                    size={'lg'}
                    color={'gradient'}
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
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Signin
