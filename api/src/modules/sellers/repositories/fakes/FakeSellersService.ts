import { ISeller } from "../../entitites/seller";
import { IFindOneSellerByIdService } from "../../services/interfaces/IFindOneSellerByIdService";

class FakeSellersService implements IFindOneSellerByIdService {
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
          affiliates: [],
          transactions: [],
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

  public async execute(sellerId: number): Promise<ISeller> {
    const foundSeller = this.sellers.find(seller => seller.id === sellerId)

    if(!foundSeller) throw new Error('No seller with this id was found')

    return foundSeller
  }
}

export default FakeSellersService
