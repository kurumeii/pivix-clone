import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { NextPageContext } from 'next'
import superjson from 'superjson'
import type { AppRouter } from '../server/trpc/routers/_app'

export interface SSRContext extends NextPageContext {
  status?: number
}

const getUrl = () => {
  if (typeof window === 'undefined') return ''
  if (process.env.NEXT_PUBLIC_WEB_URL) return `https://${process.env.NEXT_PUBLIC_WEB_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    return {
      links: [
        loggerLink(),
        httpBatchLink({
          url: `${getUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              return {
                ...ctx.req.headers,
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
      transformer: superjson,
      abortOnUnmount: true,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    }
  },
  ssr: true,
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
