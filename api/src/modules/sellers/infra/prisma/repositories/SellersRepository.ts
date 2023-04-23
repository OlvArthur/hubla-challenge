import { IFindOneSellerRepository } from "../../../repositories/IFindOneSellerRepository";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { ISeller } from "../../../entitites/seller";

export default class SellersRepository implements IFindOneSellerRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  public async findById(sellerId: number): Promise<ISeller | null> {
    const { prisma } = this.prismaContext

    const seller = await prisma.seller.findUnique({
      where: {
        id: sellerId
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return seller
  }

  public async findByName(sellerName: string): Promise<ISeller | null> {
    const { prisma } = this.prismaContext

    const seller = await prisma.seller.findUnique({
      where: {
        name: sellerName
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return seller
  }
}
