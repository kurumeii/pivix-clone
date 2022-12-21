import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../../database/prismadb'
import { procedure, router } from '../trpc'

export const postRouter = router({
  create: procedure
    .input(
      z.object({
        title: z.string().trim().min(1, {
          message: 'Title is required',
        }),
        description: z.string().trim(),
        secure_imgs: z
          .object({
            public_id: z.string(),
            url: z.string(),
            secure_url: z.string(),
            folder: z.string(),
            original_filename: z.string(),
          })
          .array(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { title, description, email, secure_imgs } = input
      if (secure_imgs.length === 0)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Images cannot be empty',
        })
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
          created_at: new Date(),
          images: {
            create: secure_imgs.map(img => ({
              imageName: img.public_id,
              url: img.url,
              secureUrl: img.secure_url,
              folder: img.folder,
              original_filename: img.original_filename,
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
