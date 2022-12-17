import { createTheme, NextUIProvider } from '@nextui-org/react'
import '@sweetalert2/themes/dark/dark.scss'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppType } from 'next/dist/pages/_app'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { trpc } from '../utils/trpc'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

const swal = withReactContent(Swal)

export const Toast = swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 5000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        defaultTheme='system'
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

