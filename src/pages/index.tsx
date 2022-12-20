import { Spacer, Text } from '@nextui-org/react'

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import LoadingPage from '../components/LoadingPage'
import type { NextPageWithLayout } from '../types/page'
import { Box } from '../utils/themes'

const Homepage: NextPageWithLayout = () => {
  const { data: session, status } = useSession()
  // const router = useRouter()

  // const { isLoading, mutate, reset } = trpc.home.unlinkAccount.useMutation({
  //   onError(error) {
  //     Toast.fire({
  //       icon: 'error',
  //       title: errorTitle(error.data?.code),
  //       text: error.message,
  //     })
  //   },
  //   async onSuccess({ resultMess }) {
  //     const { isDismissed } = await Toast.fire({
  //       timer: 2000,
  //       icon: 'success',
  //       title: successTitle('Success'),
  //       text: resultMess,
  //     })
  //     if (isDismissed) return router.reload()
  //   },
  // })

  const fakeContent = `Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Imperdiet massa
          tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Faucibus pulvinar
          elementum integer enim neque volutpat. Gravida arcu ac tortor dignissim convallis aenean.
          Lectus quam id leo in vitae. Ultricies tristique nulla aliquet enim tortor. Nec tincidunt
          praesent semper feugiat nibh sed. Imperdiet proin fermentum leo vel orci porta non
          pulvinar neque. Praesent semper feugiat nibh sed pulvinar proin gravida. Dis parturient
          montes nascetur ridiculus mus mauris. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Ut lectus arcu bibendum at. Integer enim neque volutpat ac. Diam sit
          amet nisl suscipit. Eros donec ac odio tempor orci dapibus ultrices in iaculis.
          Ullamcorper a lacus vestibulum sed arcu non odio euismod. Quis lectus nulla at volutpat
          diam ut. Turpis egestas integer eget aliquet. Adipiscing tristique risus nec feugiat in
          fermentum posuere. Morbi tempus iaculis urna id. Amet commodo nulla facilisi nullam
          vehicula ipsum a arcu.`

  return (
    <>
      <Head>
        <title>Pivix homepage</title>
      </Head>
      {status === 'loading' ? (
        <LoadingPage />
      ) : (
        <Box css={{ px: '$12', mt: '$8', '@xsMax': { px: '$10' } }}>
          <Text h2>{session ? 'Welcome, ' + session.user.name : 'Lorem ipsum dolor sit amet'}</Text>
          {[...Array(10).keys()].map((_, i) => (
            <div key={i}>
              <Text size='$lg'>{fakeContent}</Text>
              <Spacer y={1} />
            </div>
          ))}
        </Box>
      )}
    </>
  )
}

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Homepage
