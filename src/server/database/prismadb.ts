import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})
