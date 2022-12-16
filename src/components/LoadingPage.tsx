import { Container, Loading } from '@nextui-org/react'
import React from 'react'

function LoadingPage() {
  return (
    <>
      <Container
        fluid
        display='flex'
        justify='center'
        alignItems='center'
        css={{
          minHeight: '100vh',
          height: '100%',
        }}
      >
        <Loading
          type='points'
          size='lg'
        />
      </Container>
    </>
  )
}

export default LoadingPage
