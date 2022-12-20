import { UilSignin, UilSunset, UilWindMoon } from '@iconscout/react-unicons'
import { Avatar, Button, Dropdown, Navbar, Switch, Text, useTheme } from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme as useNextTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Logout } from 'react-iconly'
// import avatarPlaceholder from '../../../public/avatar-placeholder.png'
import type { HeaderContent } from '../../interfaces/navbar'
import LoadingNavbar from '../LoadingNavbar'
import CollapsableMenu from './CollapsableMenu'
export const collapsableItems: HeaderContent = [
  { name: 'homepage', link: '/' },
  { name: 'collection', link: '#' },
  { name: 'post image', link: '/post' },
]

function SharedNavbar() {
  const { data: session, status } = useSession()
  const { isDark } = useTheme()
  const { pathname } = useRouter()
  const { setTheme } = useNextTheme()

  if (status === 'loading') return <LoadingNavbar />
  return (
    <>
      <Navbar
        maxWidth={'fluid'}
        isBordered={isDark}
        shouldHideOnScroll
      >
        <Navbar.Brand>
          <Navbar.Toggle showIn={'md'} />
          <Text
            b
            color='inherit'
            transform='full-width'
            hideIn='md'
          >
            Pivix
          </Text>
        </Navbar.Brand>
        {/* Main header */}
        <Navbar.Content
          hideIn='md'
          activeColor={isDark ? 'error' : 'secondary'}
          enableCursorHighlight
          variant={'highlight'}
          gap={'$15'}
        >
          {collapsableItems.map(item => (
            <NextLink
              key={item.name}
              href={item.link}
              passHref
              legacyBehavior
            >
              <Navbar.Link
                isActive={pathname === item.link}
                css={{
                  textTransform: 'uppercase',
                }}
              >
                {item.name}
              </Navbar.Link>
            </NextLink>
          ))}

          {/* TODO: More link menu later */}
        </Navbar.Content>
        {/* Right menu */}
        <Navbar.Content
          hideIn={'md'}
          css={{
            '@xs': {
              w: '12%',
              jc: 'flex-end',
            },
          }}
        >
          <Navbar.Item>
            <Switch
              checked={isDark}
              bordered={!isDark}
              size='xl'
              color='secondary'
              shadow={isDark}
              iconOn={<UilWindMoon color='#c6b3d4' />}
              iconOff={<UilSunset color='#8B20D6' />}
              onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </Navbar.Item>
          {status === 'unauthenticated' && (
            <Navbar.Item>
              <Button
                color={'gradient'}
                shadow={isDark}
                ghost={isDark}
                onPress={() => signIn()}
                icon={<UilSignin />}
              >
                Login
              </Button>
            </Navbar.Item>
          )}
          {status === 'authenticated' && (
            <Dropdown placement='bottom-right'>
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as='button'
                    color='gradient'
                    size='lg'
                    src={session.user.image || '/public/avatar-placeholder.png'}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label='User menu actions'
                color='secondary'
                onAction={actionKey => {
                  actionKey === 'signout' && signOut()
                }}
              >
                <Dropdown.Item
                  key={'welcomeText'}
                  css={{ height: '$18' }}
                  variant='shadow'
                >
                  <Text
                    b
                    color='inherit'
                    css={{ d: 'flex' }}
                  >
                    Hi there,
                  </Text>
                  <Text
                    b
                    color=''
                    css={{ d: 'flex' }}
                  >
                    {session.user.name}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item
                  key={'profile'}
                  variant='shadow'
                  withDivider
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  key={'signout'}
                  variant='shadow'
                  color='error'
                  icon={<Logout set='curved' />}
                >
                  Change account
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Content>
        {/* Collapseable menu */}
        <CollapsableMenu />
      </Navbar>
    </>
  )
}

export default SharedNavbar
