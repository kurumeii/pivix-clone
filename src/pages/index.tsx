import { Card, Grid, Text } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import LoadingPage from '../components/LoadingPage'
import type { NextPageWithLayout } from '../types/page'
import { Box, NavigateSlide, SlideItem, SlideShowContainer } from '../utils/themes'
import { trpc } from '../utils/trpc'
import Image from 'next/image'

const Homepage: NextPageWithLayout = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchRecentPosts = trpc.home.fetchRecentPosts.useQuery(undefined, {
    networkMode: 'online',
    refetchInterval: 60 * 1000,
  })

  useEffect(() => {
    fetchRecentPosts.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Pivix homepage</title>
      </Head>
      {fetchRecentPosts.isLoading && <LoadingPage />}
      {fetchRecentPosts.data && (
        <Box css={{ px: '$12', mt: '$8', '@xsMax': { px: '$10' } }}>
          <Grid.Container
            gap={2}
            justify='center'
          >
            {fetchRecentPosts.data.posts.map(post => (
              <Grid
                xs={12}
                md={6}
                key={post.id}
              >
                <Card isHoverable>
                  <Card.Body>
                    <SlideShowContainer>
                      <NavigateSlide
                        css={{
                          left: 0,
                        }}
                      >
                        &#10094;
                      </NavigateSlide>
                      {post.images.map((img, i) => (
                        <SlideItem
                          key={img.id}
                          css={{
                            display: i === 0 ? 'block' : 'none',
                          }}
                        >
                          <Image
                            src={img.secureUrl}
                            alt={img.imageName}
                            fill
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </SlideItem>
                      ))}

                      <NavigateSlide
                        css={{
                          right: 0,
                        }}
                      >
                        &#10095;
                      </NavigateSlide>
                    </SlideShowContainer>
                  </Card.Body>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
        </Box>
      )}
    </>
  )
}

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Homepage
