import { router } from 'server/trpcs'
import { homeRouter } from './home'

export const appRouter = router({
  home: homeRouter,
})

export type AppRouter = typeof appRouter
