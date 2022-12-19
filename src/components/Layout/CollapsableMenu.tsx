import { UilSignin, UilSunset, UilWindMoon } from '@iconscout/react-unicons'
import { Button, Link, Navbar, useTheme } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme as useNextTheme } from 'next-themes'
import NextLink from 'next/link'
import type { HeaderContent } from '../../interfaces/navbar'

const collapsableItems: HeaderContent = [
  { name: 'homepage', link: '/' },
  { name: 'collection', link: '#' },
  { name: 'post image', link: '#' },
]

function CollapsableMenu() {
  const { status } = useSession()
  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()

  return (
    <Navbar.Collapse>
      {collapsableItems.map(item => (
        <Navbar.CollapseItem key={item.name}>
          <NextLink
            href={item.link}
            passHref
            legacyBehavior
          >
            <Link
              color={isDark ? 'error' : 'primary'}
              block
              css={{
                minWidth: '100%',
                textTransform: 'capitalize',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              {item.name}
            </Link>
          </NextLink>
        </Navbar.CollapseItem>
      ))}

      <Navbar.CollapseItem
        css={{
          jc: 'center',
        }}
      >
        <Button
          css={{
            width: '60%',
          }}
          ghost={isDark}
          shadow={isDark}
          color={isDark ? 'error' : 'secondary'}
          onPress={() => setTheme(isDark ? 'light' : 'dark')}
          icon={isDark ? <UilWindMoon /> : <UilSunset />}
        />
      </Navbar.CollapseItem>

      <Navbar.CollapseItem
        css={{
          jc: 'center',
        }}
      >
        {status === 'unauthenticated' && (
          <Button
            css={{
              width: '60%',
            }}
            ghost={isDark}
            shadow={isDark}
            color={'gradient'}
            onPress={() => signIn()}
            icon={<UilSignin />}
          >
            Login
          </Button>
        )}
        {status === 'authenticated' && (
          <Button
            css={{
              width: '60%',
            }}
            ghost={isDark}
            shadow={isDark}
            color={'gradient'}
            onPress={() => signOut()}
          >
            Change account
          </Button>
        )}
      </Navbar.CollapseItem>
    </Navbar.Collapse>
  )
}

export default CollapsableMenu
