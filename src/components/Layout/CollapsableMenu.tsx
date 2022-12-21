import { UilSignin, UilSunset, UilWindMoon } from '@iconscout/react-unicons'
import { Button, Link, Navbar, User, useTheme } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme as useNextTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { collapsableItems } from './SharedNavbar'

function CollapsableMenu() {
  const { data: session, status } = useSession()
  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()
  const router = useRouter()

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
                textTransform: 'uppercase',
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
          ai: 'center',
          fw: 'wrap',
          gap: '$10',
        }}
      >
        {status === 'unauthenticated' && (
          <Button
            css={{
              width: '60%',
            }}
            ghost={isDark}
            shadow={isDark}
            color={isDark ? 'error' : 'secondary'}
            onClick={() => signIn()}
            icon={<UilSignin />}
          >
            Login
          </Button>
        )}
        {status === 'authenticated' && (
          <>
            <User
              src={session.user.image || '/public/avatar-placeholder.png'}
              name={session.user.name}
              description={session.user.email || 'Anon'}
              size='xl'
              pointer
              onClick={() => {
                /* TODO: Add profile page   */
                router.push('/')
              }}
              title='To profile'
            />
            <Button
              auto
              ghost
              shadow={isDark}
              color={isDark ? 'error' : 'secondary'}
              onClick={() => signOut()}
            >
              Change account
            </Button>
          </>
        )}

        <Button
          auto
          ghost
          shadow={isDark}
          color={isDark ? 'error' : 'secondary'}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          icon={isDark ? <UilWindMoon /> : <UilSunset />}
        />
      </Navbar.CollapseItem>
    </Navbar.Collapse>
  )
}

export default CollapsableMenu
