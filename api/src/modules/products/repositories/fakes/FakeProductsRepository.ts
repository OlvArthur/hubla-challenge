import { IProduct } from "../../../products/entities/product";
import { IFindManyProductsRepository } from "../IFindManyProductsRepository";

class FakeProductsRepository implements IFindManyProductsRepository {
  private products: IProduct[] = [
    {
      id: 1,
      description: 'curso full stack',
      transactions: []
    },
    {
      id: 2,
      description: 'dominando investimentos',
      transactions: []
    }
  ]

  async findByDescriptions(productDescriptions: string[]): Promise<IProduct[]> {
    const foundProducts = this.products.filter(product => productDescriptions.includes(product.description.toLowerCase()))

    return foundProducts
  }
}

export default FakeProductsRepository

