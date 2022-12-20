import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../../database/prismadb'
import { procedure, router } from '../trpc'

export const postRouter = router({
  create: procedure
    .input(
      z.object({
        title: z.string().trim(),
        description: z.string().trim(),
        secure_imgs: z
          .object({
            secure_url: z.string(),
            original_filename: z.string(),
          })
          .array(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { title, description, email, secure_imgs } = input
      const findUniqueTitle = await prisma.post.findUnique({
        where: {
          title,
        },
      })
      if (findUniqueTitle)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Title has already been taken',
        })
      /* Create new post and image */
      const createPost = await prisma.post.create({
        data: {
          title,
          description,
          email,
          images: {
            create: secure_imgs.map(img => ({
              url: img.secure_url,
              imageName: img.original_filename,
            })),
          },
        },
      })
      if (!createPost)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Something has gone wrong',
        })
      return {
        createdPost: createPost,
      }
    }),
})
