import { ITransaction } from "../../../entities/transaction";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { IListTransactionsRepository } from "../../../repositories/IListTransactionsRepository";

export default class TransactionsRepository implements IListTransactionsRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  public async listAllTransactions(): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext
    
    const transactions = await prisma.transaction.findMany()

    return transactions
  }

  public async listCreatorTransactions(creatorId: number, creatorAffiliatesIds: number[]): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext

    const transactions = await prisma.transaction.findMany({
      where: {
          sellerId: {
            in: [creatorId, ...creatorAffiliatesIds]
          }
      }
    })

    return transactions
  }

  public async listAffiliateTransactions(affiliateId: number): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext

    const transactions = await prisma.transaction.findMany({
      where: {
        sellerId: affiliateId
      }
    })

    return transactions

  }
}
