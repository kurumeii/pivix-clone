import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscrodProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismaClient } from 'utils/prismadb'

export const authOpts: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
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
    async redirect({ baseUrl, url }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.user.id = user.id
      return session
    },
  },
}

export default NextAuth(authOpts)
