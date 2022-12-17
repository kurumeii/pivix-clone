import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import DiscrodProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../server/database/prismadb'

export const authOpts: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscrodProvider({
      clientId: process.env.DISCORD_ID || '',
      clientSecret: process.env.DISCORD_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      debugger
      if (user.email) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    redirect({ baseUrl, url }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}

export default NextAuth(authOpts)
