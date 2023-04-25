import { IFindManyProductsRepository } from "../../../repositories/IFindManyProductsRepository"
import { Context, prisma as prismaClient } from "../../../../../shared/infra/prisma/ClientInstance";
import { IProduct } from "../../../entities/product";

export class ProductsRepository implements IFindManyProductsRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  async findByDescriptions(productDescriptions: string[]): Promise<IProduct[]> {
    const { prisma } = this.prismaContext
    
    const products = await prisma.product.findMany({
      where: {
        description: {
          in: productDescriptions
        }
      },
      include: {
        transactions: true
      }
    })

    return products
  
  }
}
