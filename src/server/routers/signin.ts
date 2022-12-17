import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { procedure, router } from 'server/trpcs'
import { prismaClient } from 'utils/prismadb'
import { z } from 'zod'

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
    .mutation(async ({ input }) => {
      const { email, password } = input
      const FindUserIdByEmail = await prismaClient.user.findUnique({
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

      const OAuthResult = await prismaClient.account.findFirst({
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
      const FindUserByEmailAndPass = await prismaClient.user.findFirst({ where: { email, password } })
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
