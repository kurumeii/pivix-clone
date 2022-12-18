import { Button, Container, Loading, Text } from '@nextui-org/react'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import LoadingPage from '../components/LoadingPage'
import { Toast } from '../utils/swal'
import { trpc } from '../utils/trpc'

function Homepage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const { isLoading, mutate, reset } = trpc.home.unlinkAccount.useMutation({
    onError(error) {
      Toast.fire({
        icon: 'error',
        title: `<h4 style='color: #d63051 !important'>There has been an error: ${error.data?.code}</h4>`,
        text: error.message,
      })
    },
    async onSuccess({ resultMess }) {
      const { isDismissed } = await Toast.fire({
        timer: 2000,
        icon: 'success',
        title: `<h4 style='color: #76B947 !important'>Success</h4>`,
        text: resultMess,
      })
      if (isDismissed) return router.reload()
    },
  })

  if (status === 'loading') return <LoadingPage />

  return (
    <>
      <Head>
        <title>Pivix homepage</title>
      </Head>
      <Container
        fluid
        display='flex'
        justify='center'
        alignItems='center'
        direction='column'
        css={{
          minHeight: '100vh',
          height: '100%',
        }}
      >
        {status === 'unauthenticated' && (
          <Button
            color='gradient'
            size={'lg'}
            onPress={() => signIn()}
          >
            Click to login
          </Button>
        )}
        {status === 'authenticated' && (
          <>
            <Text
              as={'div'}
              css={{
                textGradient: '45deg, $yellow500 -20%, $red600 100%',
                fontSize: '$3xl',
                py: '$10',
              }}
            >
              Welcome {session.user.name}
            </Text>
            <Button
              color={'error'}
              shadow
              bordered
              ghost
              css={{
                fontSize: '$lg',
                letterSpacing: '$wide',
                textTransform: 'uppercase',
                my: '$10',
              }}
              onPress={() => signOut()}
            >
              Log out
            </Button>
            <Button
              color={'secondary'}
              shadow
              bordered
              ghost
              css={{
                fontSize: '$lg',
                letterSpacing: '$wide',
                textTransform: 'uppercase',
                my: '$10',
              }}
              onPress={() => {
                if (!session.user.email) return
                mutate({
                  email: session.user.email,
                })
                reset()
              }}
              disabled={isLoading}
            >
              {isLoading && (
                <Loading
                  color='currentColor'
                  size='sm'
                />
              )}
              Unlink this account
            </Button>
          </>
        )}
      </Container>
    </>
  )
}

export default Homepage
