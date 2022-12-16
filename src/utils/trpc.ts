import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from 'server/routers/_app'
import superjson from 'superjson'

const getUrl = () => {
  if (typeof window === 'undefined') return ''
  if (process.env.NEXT_PUBLIC_WEB_URL) return `https://${process.env.NEXT_PUBLIC_WEB_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        loggerLink(),
        httpBatchLink({
          url: `${getUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
      abortOnUnmount: true,
    }
  },
  ssr: true,
})
