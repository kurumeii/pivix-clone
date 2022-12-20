import { Text } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Layout from '../components/Layout/Layout'
import LoadingPage from '../components/LoadingPage'
import type { NextPageWithLayout } from '../types/page'
import { errorTitle, successTitle, Toast } from '../utils/swal'
import { Box } from '../utils/themes'
import { trpc } from '../utils/trpc'

const Homepage: NextPageWithLayout = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchRecentPosts = trpc.home.fetchRecentPosts.useQuery()

  return (
    <>
      <Head>
        <title>Pivix homepage</title>
      </Head>
      {fetchRecentPosts.isLoading && <LoadingPage />}
      {fetchRecentPosts.data && (
        <Box css={{ px: '$12', mt: '$8', '@xsMax': { px: '$10' } }}>
          {fetchRecentPosts.data.posts.map(post => (
            <p key={post.id}>{post.email}</p>
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
