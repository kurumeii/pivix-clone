import { createTheme, NextUIProvider } from '@nextui-org/react'
import { NextComponentType } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
const myTheme = createTheme({
  type: 'dark',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider theme={myTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}

