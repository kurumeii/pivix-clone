import { Loading, Navbar, useTheme } from '@nextui-org/react'
import React from 'react'

function LoadingNavbar() {
  const { isDark } = useTheme()
  return (
    <>
      <Navbar
        maxWidth={'fluid'}
        isBordered
      >
        <Navbar.Content
          css={{
            w: '100%',
            jc: 'center',
          }}
        >
          <Navbar.Item>
            <Loading
              type='points-opacity'
              size='lg'
              color={isDark ? 'white' : 'error'}
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  )
}

export default LoadingNavbar
