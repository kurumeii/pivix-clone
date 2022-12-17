import { router } from 'server/trpcs'
import { homeRouter } from './home'
import { signinRouter } from './signin'

export const appRouter = router({
  home: homeRouter,
  signin: signinRouter,
})

export type AppRouter = typeof appRouter
