
import { ITransaction } from "../../../entities/transaction";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { IListTransactionsRepository } from "../../../repositories/IListTransactionsRepository";
import { ICreateManyTransactionsRepository } from "modules/transactions/repositories/ICreateManyTransactionsRepository";
import { ICreateTransactionDTO } from "../../../DTOs/ICreateTransactionDTO";

export default class TransactionsRepository implements IListTransactionsRepository, ICreateManyTransactionsRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  async createMany(transactions: ICreateTransactionDTO[]): Promise<{ count: number }> {
    const { prisma } = this.prismaContext
    
    return await prisma.transaction.createMany({
      data: transactions,
      skipDuplicates: true
    })
  }

  public async listAllTransactions(): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext
    
    const transactions = await prisma.transaction.findMany({
      include: {
        transactionType: true,
        product: true,
        seller: true
      }
    })

    return transactions
  }

  public async listCreatorTransactions(creatorId: number, creatorAffiliatesIds: number[]): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext

    const transactions = await prisma.transaction.findMany({
      where: {
        sellerId: {
          in: [creatorId, ...creatorAffiliatesIds]
        }
      },
      include: {
        transactionType: true,
        product: true,
        seller: true
      }
    })

    return transactions
  }

  public async listAffiliateTransactions(affiliateId: number): Promise<ITransaction[]> {
    const { prisma } = this.prismaContext

    const transactions = await prisma.transaction.findMany({
      where: {
        sellerId: affiliateId
      },
      include: {
        transactionType: true,
        product: true,
        seller: true
      }
    })

    return transactions

  }
}
