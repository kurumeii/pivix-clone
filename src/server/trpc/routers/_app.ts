import { router } from '../trpc'
import { homeRouter } from './home'
import { postRouter } from './post'
import { signinRouter } from './signin'

export const appRouter = router({
  home: homeRouter,
  signin: signinRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
