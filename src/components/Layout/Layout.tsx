import { Box } from '../../utils/themes'
import SharedNavbar from './SharedNavbar'

type Props = {
  children: JSX.Element
}

function Layout({ children }: Props) {
  return (
    <Box
      css={{
        maxW: '100%',
      }}
    >
      <SharedNavbar />
      <main>{children}</main>
    </Box>
  )
}

export default Layout
