import { IFindManyTransactionTypesRepository } from "../../../repositories/IFindManyTransactionTipesRepository";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance"
import { TransactionType } from "shared/infra/prisma/client";

export class TransactionTypesRepository implements IFindManyTransactionTypesRepository{
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  async findByIds(ids: number[]): Promise<TransactionType[]> {
    const { prisma } = this.prismaContext

    const types = await prisma.transactionType.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return types
  }
}
