import { procedure, router } from 'server/trpcs'
import { prismaClient } from 'utils/prismadb'
import { z } from 'zod'

export const homeRouter = router({
  unlinkAccount: procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input
      await prismaClient.user.delete({
        where: {
          email,
        },
      })
      return {
        resultMess: 'Successfully unlinked',
      }
    }),
})
