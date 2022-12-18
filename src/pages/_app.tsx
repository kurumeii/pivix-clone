import { NextUIProvider } from '@nextui-org/react'
import '@sweetalert2/themes/dark/dark.scss'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppType } from 'next/dist/pages/_app'
import { trpc } from '../utils/trpc'

import { createTheme } from '@nextui-org/react'
import { darkThemeOptions, lightThemeOptions } from '../utils/themes'

export const lightTheme = createTheme(lightThemeOptions)

export const darkTheme = createTheme(darkThemeOptions)

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        enableColorScheme
        attribute='class'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)

