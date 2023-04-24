import { ISeller } from "../../entitites/seller";
import { IFindManySellersRepository } from "../IFindManySellersRepository";

class FakeSellersRepository implements IFindManySellersRepository {
  private sellers: ISeller[] = [
    {
      id: 1,
      name: 'Jhon Doe',
      isAdmin: true,
      isAffiliatedTo: null,
      affiliates: [],
      transactions: [],
    },
    {
      id: 2,
      name: 'Jane Doe',
      isAdmin: false,
      isAffiliatedTo: null,
      affiliates: [
        {
          id: 3,
          name: 'Mark Doe',
          isAdmin: false,
          isAffiliatedTo: 2
        }
      ],
      transactions: [],
    },
    {
      id: 3,
      name: 'Mark Doe',
      isAdmin: false,
      isAffiliatedTo: 2,
      affiliates: [],
      transactions: [],
    }
  ]

  async findByNames(sellerNames: string[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => sellerNames.includes(seller.name))

    return foundSellers
  }

  async findByIds(sellerIds: number[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => sellerIds.includes(seller.id))

    return foundSellers
  }
}

export default FakeSellersRepository
