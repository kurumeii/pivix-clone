import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import { getProviders } from 'next-auth/react'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next/types'

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              }}
            >
              {providers &&
                Object.values(providers).map(provider => (
                  <Button
                    key={provider.id}
                    color={'primary'}
                    shadow
                  >
                    <Text
                      size={'$lg'}
                      css={{ letterSpacing: '$wider' }}
                    >
                      {' '}
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
