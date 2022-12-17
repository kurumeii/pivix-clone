import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { procedure, router } from '../trpc'

export const signinRouter = router({
  submit: procedure
    .input(
      z.object({
        email: z.string().trim().email({
          message: 'Not a valid email',
        }),
        password: z
          .string()
          .min(8, {
            message: 'Password must contain at least 8 character(s)',
          })
          .regex(/^\S*$/, {
            message: 'Password must not contain spaces',
          }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const FindUserIdByEmail = await ctx.prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          email,
        },
      })
      if (!FindUserIdByEmail)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email not found',
        })

      const OAuthResult = await ctx.prisma.account.findFirst({
        select: {
          provider: true,
        },
        where: {
          userId: {
            equals: FindUserIdByEmail.id,
          },
        },
      })
      if (OAuthResult !== null) {
        if (OAuthResult.provider !== '')
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Email has already been linked with ${OAuthResult?.provider} provider`,
          })
      }
      const FindUserByEmailAndPass = await ctx.prisma.user.findFirst({
        where: { email, password },
      })
      if (!FindUserByEmailAndPass)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Wrong password',
        })
      const { image, name } = FindUserByEmailAndPass
      return {
        user: { image, name },
      }
    }),
})
