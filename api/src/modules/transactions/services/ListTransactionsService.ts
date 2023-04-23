import { IFindOneSellerByIdService } from "../../sellers/services/interfaces/IFindOneSellerByIdService"
import { ITransaction } from "../entities/transaction"
import { IListTransactionsRepository } from "../repositories/IListTransactionsRepository"
import { IListTransactionsService } from "./interfaces/IListTransactionsService"


class ListTransactionsService implements IListTransactionsService {
  constructor(
    private transactionsRepository: IListTransactionsRepository,
    private findOneSellerService: IFindOneSellerByIdService
  ) {}
  
  public async execute(authenticatedSellerId: number): Promise<ITransaction[]> {
    const seller = await this.findOneSellerService.execute(authenticatedSellerId)

    if (seller.isAdmin) return this.transactionsRepository.listAllTransactions()

    const sellerIsAffiliated = Boolean(seller.isAffiliatedTo) 
    if (sellerIsAffiliated) return this.transactionsRepository.listAffiliateTransactions(seller.id)

    const creatorAffiliatesIds = seller.affiliates.map(affiliate => affiliate.id)
    const creatorTransactions = await this.transactionsRepository.listCreatorTransactions(
      seller.id,
      creatorAffiliatesIds
    )

    return creatorTransactions


  }
}

export default ListTransactionsService
