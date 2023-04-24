import { ICreateTransactionDTO } from "../DTOs/ICreateTransactionDTO"
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository"
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService"

type IRequestDTO = Omit<ICreateTransactionDTO, 'productId' | 'sellerId'> 

class CreateManyTransactionsService implements ICreateManyTransactionsService {
  constructor(
    private transactionsRepository: ICreateManyTransactionsRepository
  ) {}

  async execute(transactions: IRequestDTO[]): Promise<{ count: number }> {
    // TODO check if all typeID exists, if not return which ones don`t exist

    // TODO check if all product descriptions exist, if not return which ones don`t exist

    // TODO check if all sellers exist, if not return which ones don`t exist

    const enrichedDTOs = this.enrichDTOwithProductIdAndSellerId(transactions, [], [])

    return await this.transactionsRepository.createMany(enrichedDTOs)
  }

  enrichDTOwithProductIdAndSellerId(transactionsDTOs: IRequestDTO[], parsedProducts: any, parsedSellers: any) {
    const enrichedDTOs: ICreateTransactionDTO[] = transactionsDTOs.map(transactionDTO => ({
      ...transactionDTO,
      productId: 2,
      sellerId: 4
    }))

    return enrichedDTOs
  }
}

export default CreateManyTransactionsService
