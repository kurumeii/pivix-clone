import { Container, Loading, useTheme } from '@nextui-org/react'
import React from 'react'

function LoadingPage() {
  const { isDark } = useTheme()
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
          color={isDark ? 'white' : 'error'}
        />
      </Container>
    </>
  )
}

export default LoadingPage
