import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { type Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

/**
 * Reusable middleware that checks if users are authenticated.
 **/
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Session timed out',
    })
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

export const router = t.router
export const procedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const mergeRouter = t.mergeRouters
export const middleware = t.middleware
