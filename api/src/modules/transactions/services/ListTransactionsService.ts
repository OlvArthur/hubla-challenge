import AppError from "../../../shared/commons/AppError"
import { IFindOneSellerRepository } from "../../sellers/repositories/IFindOneSellerRepository"
import { ITransaction } from "../entities/transaction"
import { IListTransactionsRepository } from "../repositories/IListTransactionsRepository"
import { IListTransactionsService } from "./interfaces/IListTransactionsService"
import { StatusCode } from "../../../shared/commons"


class ListTransactionsService implements IListTransactionsService {
  constructor(
    private transactionsRepository: IListTransactionsRepository,
    private sellersRepository: IFindOneSellerRepository
  ) {}
  
  public async execute(authenticatedSellerId: number): Promise<ITransaction[]> {
    const seller = await this.sellersRepository.findById(authenticatedSellerId)

    if(!seller) throw new AppError('No seller with this id was found. Please login again', StatusCode.NOT_FOUND, { sellerId: authenticatedSellerId })

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
