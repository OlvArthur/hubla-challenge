import AppError from '../../../shared/commons/AppError'
import { IFindManySellersRepository } from "../../sellers/repositories/IFindManySellersRepository"
import { StatusCode } from "../../../shared/commons"
import { ISeller } from "../../sellers/entitites/seller"
import { ICreateTransactionDTO, ICreateTransactionRequestDTO } from "../DTOs"
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository"
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService"
import { IFindManyProductsRepository } from "../../products/repositories/IFindManyProductsRepository"
import { IProduct } from "../../products/entities/product"
import { IFindManyTransactionTypesRepository } from '../repositories/IFindManyTransactionTipesRepository'
import { ITransactionType } from '../entities/transactionType'

export class CreateManyTransactionsService implements ICreateManyTransactionsService {
  constructor(
    private sellersRepository: IFindManySellersRepository,
    private productsRepository: IFindManyProductsRepository,
    private transactionTypesRepository: IFindManyTransactionTypesRepository,
    private transactionsRepository: ICreateManyTransactionsRepository,
  ) {}

  async execute(transactions: ICreateTransactionRequestDTO[]): Promise<{ count: number }> {
    const { sellerNames, productDescriptions, typeIds } = this.getEntitiesIdentifiersFromTransactions(transactions)

    const transactionTypes = await this.transactionTypesRepository.findByIds(typeIds)

    const products = await this.productsRepository.findByDescriptions(productDescriptions)

    const sellers = await this.sellersRepository.findByNames(sellerNames)

    const enrichedDTOs = this.enrichDTOAndValidateEntitiesExistence(transactions, products, sellers, transactionTypes)

    return await this.transactionsRepository.createMany(enrichedDTOs)
  }

  getEntitiesIdentifiersFromTransactions(transactions: ICreateTransactionRequestDTO[]) {
    const [sellerNames, productDescriptions, typeIds] = transactions.reduce((acc, curr) => {
      const transactionSellerName = curr.sellerName.toLowerCase().trim()
      acc[0].push(transactionSellerName)

      const transactionProductDescription = curr.productDescription.toLowerCase().trim()
      acc[1].push(transactionProductDescription)

      const typeId = curr.typeId
      acc[2].push(typeId)
      
      return acc
    }, [[], [], []] as [string[], string[], number[]])

    return {
      sellerNames,
      productDescriptions,
      typeIds
    }
  }

  enrichDTOAndValidateEntitiesExistence(transactionsDTOs: ICreateTransactionRequestDTO[], products: IProduct[], sellers: ISeller[], types: ITransactionType[]) {
    const parsedSellers = this.parseSellersByName(sellers)
    const parsedProducts = this.parseProductsByDescription(products)
    const parsedTypes = this.parseTypesById(types)
    
    const enrichedDTOs: ICreateTransactionDTO[] = transactionsDTOs.map(transactionDTO => {
      const transactionSeller = parsedSellers[transactionDTO.sellerName.toLowerCase().trim()]

      if(!transactionSeller) {
        throw new AppError(
          'the operation could not be completed due to an inexistent seller name',
          StatusCode.BAD_REQUEST,
          { sellerName: transactionDTO.sellerName.toLowerCase().trim() }
        )
      }

      const transactionProduct = parsedProducts[transactionDTO.productDescription.toLowerCase().trim()]

      if(!transactionProduct) {
        throw new AppError(
          'the operation could not be completed due to an inexistent product description',
          StatusCode.BAD_REQUEST,
          { productDescription: transactionDTO.productDescription.toLowerCase().trim() }
        )
      }

      const transactionType = parsedTypes[Number(transactionDTO.typeId)]

      if(!transactionType) {
        throw new AppError(
          'the operation could not be completed due to an inexistent type id',
          StatusCode.BAD_REQUEST,
          { typeId: transactionDTO.typeId }
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
      const sellerName = seller.name.toLowerCase().trim()
      seller.name = sellerName
      
      acc[sellerName] = seller
      return acc
    }, {})

    return parsedSellers
  }

  parseProductsByDescription(products: IProduct[]) {
    const parsedSellers = products.reduce<{ [description: string]: IProduct }>((acc, product) => {
      const productDescription = product.description.toLowerCase().trim()
      product.description = productDescription
      
      acc[productDescription] = product
      return acc
    }, {})

    return parsedSellers
  }

  parseTypesById(types: ITransactionType[]) {
    const parsedTypes = types.reduce<{ [id: number]: ITransactionType }>((acc, type) => {
      const typeId = type.id
      
      acc[typeId] = type
      return acc
    }, {})

    return parsedTypes
  }

}
