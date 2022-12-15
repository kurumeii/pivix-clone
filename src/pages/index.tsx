import { Button, Container } from '@nextui-org/react'
import React from 'react'
import { signIn } from 'next-auth/react'

function Homepage() {
  return (
    <>
      <Container
        xl
        display='flex'
        justify='center'
        alignItems='center'
        css={{
          minHeight: '100vh',
          height: '100%',
        }}
      >
        <Button
          color='gradient'
          size={'lg'}
          onClick={() => signIn()}
        >
          Click to login
        </Button>
      </Container>
    </>
  )
}

export default Homepage
