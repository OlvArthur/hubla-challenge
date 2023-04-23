import { PrismaClient } from './client'

export type Context = {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export { prisma }
