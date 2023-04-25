import { PrismaClient } from '../../shared/infra/prisma/client'

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.transactionType.deleteMany(),
    prisma.product.deleteMany(),
    prisma.seller.deleteMany()
  ])
}
