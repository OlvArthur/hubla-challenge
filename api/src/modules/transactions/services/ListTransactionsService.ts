import { ITransaction } from "../entities/transaction"
import { IListTransactionsRepository } from "../repositories/IListTransactionsRepository"
import { IListTransactionsService } from "./interfaces/IListTransactionsService"


class ListTransactionsService implements IListTransactionsService {
  constructor(private transactionsRepository: IListTransactionsRepository) {}
  
  public async execute(authenticatedSellerId: number): Promise<ITransaction[]> {
    // TODO find seller and use his/her access level info
    const seller = {
      id: 4,
      name: 'Jhon Doe',
      is_affiliated_to: null,
      is_admin: true,
      affiliates: [] as { id: number}[]
    }

    if (seller.is_admin) return this.transactionsRepository.listAllTransactions()

    const sellerIsAffiliated = seller.is_affiliated_to !== null 
    if (sellerIsAffiliated) return this.transactionsRepository.listAffiliateTransactions(seller.id)

    const creatorAffiliatesIds = seller.affiliates.map(affiliate => affiliate.id)
    const creatorTransactions = this.transactionsRepository.listCreatorTransactions(
      seller.id,
      creatorAffiliatesIds
    )

    return creatorTransactions


  }
}

export default ListTransactionsService
