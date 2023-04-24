import { ISeller } from "../../entitites/seller";
import { IFindManySellersRepository } from "../IFindManySellersRepository";
import { IFindOneSellerRepository } from "../IFindOneSellerRepository";

class FakeSellersRepository implements IFindManySellersRepository, IFindOneSellerRepository {
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

  async findByName(sellerName: string): Promise<ISeller | null> {
    const foundSeller = this.sellers.find(seller => seller.name.toLowerCase() === sellerName.toLowerCase())

    if(!foundSeller) return null

    return foundSeller
  }


  async findByNames(sellerNames: string[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => sellerNames.includes(seller.name.toLowerCase()))

    return foundSellers
  }

  async findById(sellerId: number): Promise<ISeller | null> {
    const foundSeller = this.sellers.find(seller => seller.id === sellerId)

    if(!foundSeller) return null

    return foundSeller
  }

  async findByIds(sellerIds: number[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => sellerIds.includes(seller.id))

    return foundSellers
  }


}

export default FakeSellersRepository
