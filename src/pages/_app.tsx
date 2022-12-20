import { createTheme, NextUIProvider } from '@nextui-org/react'
import '@sweetalert2/themes/dark/dark.scss'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppPropsWithLayout } from '../types/page'
import { getDayOrNightheme } from '../utils/helpers'
import { darkThemeOptions, lightThemeOptions } from '../utils/themes'
import { trpc } from '../utils/trpc'

const customeTheme = {
  lightTheme: createTheme(lightThemeOptions),
  darkTheme: createTheme(darkThemeOptions),
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { session } = pageProps
  const getLayout = Component.getLayout || (page => page)
  return (
    <SessionProvider
      session={session}
      refetchInterval={10 * 60}
      refetchWhenOffline={false}
    >
      <ThemeProvider
        enableColorScheme
        defaultTheme={getDayOrNightheme()}
        attribute='class'
        value={{
          light: customeTheme.lightTheme.className,
          dark: customeTheme.darkTheme.className,
        }}
      >
        <NextUIProvider>{getLayout(<Component {...pageProps} />)}</NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)

