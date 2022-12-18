import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import DiscrodProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import MailProvider from 'next-auth/providers/email'
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
    MailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 60 * 2,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token.id && token.accessToken) {
        session.accessToken = token.accessToken
        session.user.id = token.id
      }

      return session
    },
  },
}

export default NextAuth(authOpts)
