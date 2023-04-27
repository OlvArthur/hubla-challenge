import { ProductsRepository } from "../../products/infra/prisma/repositories/ProductsRepository"
import { SellersRepository } from "../../sellers/infra/prisma/repositories/SellersRepository"
import CreateManyTransactionsController from "../infra/express/controllers/CreateManyTransactionsController"
import { TransactionTypesRepository } from "../infra/prisma/repositories/TransactionTypesRepository"
import { TransactionsRepository } from "../infra/prisma/repositories/TransactionsRepository"
import { CreateManyTransactionsService } from "../services/CreateManyTransactionsService"

export const createManyTransactionsFactory = (): CreateManyTransactionsController => {
  const sellersRepository = new SellersRepository()
  const productsRepository = new ProductsRepository()
  const transactionTypesRepository = new TransactionTypesRepository()

  const transactionsRepository = new TransactionsRepository()
  const service = new CreateManyTransactionsService(sellersRepository, productsRepository, transactionTypesRepository, transactionsRepository)
  return new CreateManyTransactionsController(service)
}
