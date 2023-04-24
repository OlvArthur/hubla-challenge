import { IFindManySellersRepository } from "../../sellers/repositories/IFindManySellersRepository"
import { StatusCode } from "../../../shared/commons"
import AppError from '../../../shared/commons/AppError'
import { ISeller } from "../../sellers/entitites/seller"
import { ICreateTransactionDTO, ICreateTransactionRequestDTO } from "../DTOs"
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository"
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService"

class CreateManyTransactionsService implements ICreateManyTransactionsService {
  constructor(
    private sellersRepository: IFindManySellersRepository,
    private transactionsRepository: ICreateManyTransactionsRepository
  ) {}

  async execute(transactions: ICreateTransactionRequestDTO[]): Promise<{ count: number }> {
    // TODO check if all typeID exists, if not return which ones don`t exist

    // TODO check if all product descriptions exist, if not return which ones don`t exist

    const { sellerNames, productDescriptions } = this.getSellerNamesAndProductDescriptionsFromTransactions(transactions)

    const sellers = await this.sellersRepository.findByNames(sellerNames)

    const enrichedDTOs = this.enrichDTOwithProductIdAndSellerId(transactions, [], sellers)

    return await this.transactionsRepository.createMany(enrichedDTOs)
  }

  getSellerNamesAndProductDescriptionsFromTransactions(transactions: ICreateTransactionRequestDTO[]) {
    const [sellerNames, productDescriptions] = transactions.reduce((acc, curr) => {
      const transactionSellerName = curr.sellerName
      acc[0].push(transactionSellerName)

      const transactionProductDescription = curr.productDescription
      acc[1].push(transactionProductDescription)
      
      return acc
    }, [[], []] as string[][])

    return {
      sellerNames,
      productDescriptions
    }
  }

  enrichDTOwithProductIdAndSellerId(transactionsDTOs: ICreateTransactionRequestDTO[], parsedProducts: any, sellers: ISeller[]) {
    const parsedSellers = this.parseSellersByName(sellers)
    
    const enrichedDTOs: ICreateTransactionDTO[] = transactionsDTOs.map(transactionDTO => {
      const transactionSeller = parsedSellers[transactionDTO.sellerName]

      if(!transactionSeller) {
        throw new AppError(
          'the operation could no be completed due to an inexistent seller name',
          StatusCode.BAD_REQUEST,
          { sellerName: transactionDTO.sellerName }
        )
      }

      return {
        ...transactionDTO,
        productId: 2,
        sellerId: transactionSeller.id
      }
    })

    return enrichedDTOs
  }

  parseSellersByName(sellers: ISeller[]) {
    const parsedSellers = sellers.reduce<{ [name: string]: ISeller }>((acc, seller) => {
      const sellerName = seller.name
      
      acc[sellerName] = seller
      return acc
    }, {})

    return parsedSellers
  }

}

export default CreateManyTransactionsService
