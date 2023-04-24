import AppError from '../../../shared/commons/AppError'
import { IFindManySellersRepository } from "../../sellers/repositories/IFindManySellersRepository"
import { StatusCode } from "../../../shared/commons"
import { ISeller } from "../../sellers/entitites/seller"
import { ICreateTransactionDTO, ICreateTransactionRequestDTO } from "../DTOs"
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository"
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService"
import { IFindManyProductsRepository } from "../../products/repositories/IFindManyProductsRepository"
import { IProduct } from "../../products/entities/product"

class CreateManyTransactionsService implements ICreateManyTransactionsService {
  constructor(
    private sellersRepository: IFindManySellersRepository,
    private productsRepository: IFindManyProductsRepository,
    private transactionsRepository: ICreateManyTransactionsRepository,
  ) {}

  async execute(transactions: ICreateTransactionRequestDTO[]): Promise<{ count: number }> {
    // TODO check if all typeID exists, if not return which ones don`t exist

    const { sellerNames, productDescriptions } = this.getSellerNamesAndProductDescriptionsFromTransactions(transactions)

    const products = await this.productsRepository.findByDescriptions(productDescriptions)

    const sellers = await this.sellersRepository.findByNames(sellerNames)

    const enrichedDTOs = this.enrichDTOwithProductIdAndSellerId(transactions, products, sellers)

    return await this.transactionsRepository.createMany(enrichedDTOs)
  }

  getSellerNamesAndProductDescriptionsFromTransactions(transactions: ICreateTransactionRequestDTO[]) {
    const [sellerNames, productDescriptions] = transactions.reduce((acc, curr) => {
      const transactionSellerName = curr.sellerName.toLowerCase()
      acc[0].push(transactionSellerName)

      const transactionProductDescription = curr.productDescription.toLowerCase()
      acc[1].push(transactionProductDescription)
      
      return acc
    }, [[], []] as string[][])

    return {
      sellerNames,
      productDescriptions
    }
  }

  enrichDTOwithProductIdAndSellerId(transactionsDTOs: ICreateTransactionRequestDTO[], products: IProduct[], sellers: ISeller[]) {
    const parsedSellers = this.parseSellersByName(sellers)
    const parsedProducts = this.parseProductsByDescription(products)
    
    const enrichedDTOs: ICreateTransactionDTO[] = transactionsDTOs.map(transactionDTO => {
      const transactionSeller = parsedSellers[transactionDTO.sellerName.toLowerCase()]

      if(!transactionSeller) {
        throw new AppError(
          'the operation could no be completed due to an inexistent seller name',
          StatusCode.BAD_REQUEST,
          { sellerName: transactionDTO.sellerName }
        )
      }

      const transactionProduct = parsedProducts[transactionDTO.productDescription.toLowerCase()]

      if(!transactionProduct) {
        throw new AppError(
          'the operation could no be completed due to an inexistent product description',
          StatusCode.BAD_REQUEST,
          { productDescription: transactionDTO.productDescription }
        )
      }

      const { productDescription, sellerName, ...rest } = transactionDTO

      return {
        ...rest,
        productId: transactionProduct.id,
        sellerId: transactionSeller.id
      }
    })

    return enrichedDTOs
  }

  parseSellersByName(sellers: ISeller[]) {
    const parsedSellers = sellers.reduce<{ [name: string]: ISeller }>((acc, seller) => {
      const sellerName = seller.name.toLowerCase()
      seller.name = sellerName
      
      acc[sellerName] = seller
      return acc
    }, {})

    return parsedSellers
  }

  parseProductsByDescription(products: IProduct[]) {
    const parsedSellers = products.reduce<{ [description: string]: IProduct }>((acc, product) => {
      const productDescription = product.description.toLowerCase()
      product.description = productDescription
      
      acc[productDescription] = product
      return acc
    }, {})

    return parsedSellers
  }

}

export default CreateManyTransactionsService
