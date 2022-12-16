import { createTheme, NextUIProvider } from '@nextui-org/react'
import '@sweetalert2/themes/dark/dark.scss'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { AppType } from 'next/app'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2/dist/sweetalert2'
import { trpc } from 'utils/trpc'

const myTheme = createTheme({
  type: 'dark',
})
const swal = withReactContent(Swal)

export const Toast = swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

function App({ Component, pageProps }: AppProps): AppType {
  return (
    <NextUIProvider theme={myTheme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  )
}

export default trpc.withTRPC(App)

