import { z } from 'zod'
import { prisma } from '../../database/prismadb'
import { procedure, protectedProcedure, router } from '../trpc'

export const homeRouter = router({
  getSession: procedure.query(({ ctx }) => ctx.session),
  //Only when user logged on can they unlink their account
  unlinkAccount: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input
      await ctx.prisma.user.delete({
        where: {
          email,
        },
      })
      return {
        resultMess: 'Successfully unlinked',
      }
    }),
  fetchRecentPosts: procedure.query(async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        images: true,
      },
    })
    return {
      posts,
    }
  }),
})
