import { Container, Loading } from '@nextui-org/react'
import React from 'react'

function LoadingNavbar() {
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
          type='points-opacity'
          size='lg'
        />
      </Container>
    </>
  )
}

export default LoadingNavbar
