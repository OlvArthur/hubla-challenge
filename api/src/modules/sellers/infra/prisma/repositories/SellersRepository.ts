import { IFindOneSellerRepository } from "../../../repositories/IFindOneSellerRepository";
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { ISeller } from "../../../entitites/seller";
import { IFindManySellersRepository } from "../../../repositories/IFindManySellersRepository";

export default class SellersRepository implements IFindOneSellerRepository, IFindManySellersRepository {
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

  async findByIds(sellerIds: number[]): Promise<ISeller[]> {
    const { prisma } = this.prismaContext
    
    const sellers = await prisma.seller.findMany({
      where: {
        id: {
          in: sellerIds
        }
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return sellers
  }

  async findByNames(sellerNames: string[]): Promise<ISeller[]> {
    const { prisma } = this.prismaContext
    
    const sellers = await prisma.seller.findMany({
      where: {
        name: {
          in: sellerNames
        }
      },
      include: {
        affiliates: true,
        transactions: true
      }
    })

    return sellers
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
