import { TRPCError } from '@trpc/server'
import md5 from 'md5'
import { z } from 'zod'
import { prisma } from '../../database/prismadb'
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
            message: 'Password must not be empty and contains at least 8 character(s)',
          })
          .regex(/^\S*$/, {
            message: 'Password must not contain spaces',
          }),
        remember: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input
      const md5Password = md5(password)
      const FindUserIdByEmail = await prisma.user.findUnique({
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
      const OAuthResult = await prisma.account.findFirst({
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
        if (OAuthResult.provider !== 'custom')
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Email has already been linked with ${OAuthResult?.provider} provider`,
          })
      }
      const FindUserByEmailAndPass = await prisma.user.findFirst({
        where: { email, password: md5Password },
      })
      if (!FindUserByEmailAndPass)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Wrong password',
        })
      return {
        user: FindUserByEmailAndPass,
      }
    }),
})
