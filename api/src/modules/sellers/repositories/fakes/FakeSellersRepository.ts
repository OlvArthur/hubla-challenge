import { ISeller } from "../../entitites/seller";
import { IFindManySellersRepository } from "../IFindManySellersRepository";
import { IFindOneSellerRepository } from "../IFindOneSellerRepository";

class FakeSellersRepository implements IFindManySellersRepository, IFindOneSellerRepository {
  private sellers: ISeller[] = [
    {
      id: 1,
      name: 'Jhon Doe',
      email: 'jhon.doe@test.com',
      password: 'testPassword',
      isAdmin: true,
      isAffiliatedTo: null,
      affiliates: [],
      transactions: [],
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@test.com',
      password: 'testPassword',
      isAdmin: false,
      isAffiliatedTo: null,
      affiliates: [
        {
          id: 3,
          name: 'Mark Doe',
          email: 'mark.doe@test.com',
          password: 'testPassword',
          isAdmin: false,
          isAffiliatedTo: 2
        }
      ],
      transactions: [],
    },
    {
      id: 3,
      name: 'Mark Doe',
      email: 'mark.doe@test.com',
      password: 'testPassword',
      isAdmin: false,
      isAffiliatedTo: 2,
      affiliates: [],
      transactions: [],
    }
  ]

  async findByEmail(email: string): Promise<ISeller | null> {
    const foundSeller = this.sellers.find(seller => seller.email === email)

    if(!foundSeller) return null

    return foundSeller
  }

  async findByName(name: string): Promise<ISeller | null> {
    const foundSeller = this.sellers.find(seller => seller.name.toLowerCase() === name.toLowerCase())

    if(!foundSeller) return null

    return foundSeller
  }


  async findByNames(names: string[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => names.includes(seller.name.toLowerCase()))

    return foundSellers
  }

  async findById(id: number): Promise<ISeller | null> {
    const foundSeller = this.sellers.find(seller => seller.id === id)

    if(!foundSeller) return null

    return foundSeller
  }

  async findByIds(ids: number[]): Promise<ISeller[]> {
    const foundSellers = this.sellers.filter(seller => ids.includes(seller.id))

    return foundSellers
  }


}

export default FakeSellersRepository
