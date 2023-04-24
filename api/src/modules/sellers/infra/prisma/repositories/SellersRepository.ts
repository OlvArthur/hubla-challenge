import { IFindOneSellerRepository } from "../../../repositories/IFindOneSellerRepository";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { ISeller } from "../../../entitites/seller";

export default class SellersRepository implements IFindOneSellerRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  public async findById(id: number): Promise<ISeller | null> {
    const { prisma } = this.prismaContext

    const seller = await prisma.seller.findUnique({
      where: {
        id,
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return seller
  }

  public async findByName(name: string): Promise<ISeller | null> {
    const { prisma } = this.prismaContext

    const seller = await prisma.seller.findUnique({
      where: {
        name
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return seller
  }

  public async findByEmail(email: string): Promise<ISeller | null> {
    const { prisma } = this.prismaContext

    const seller = await prisma.seller.findUnique({
      where: {
        email
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return seller
  }
}
