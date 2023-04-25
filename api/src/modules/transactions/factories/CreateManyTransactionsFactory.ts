import { ProductsRepository } from "../../products/infra/prisma/repositories/ProductsRepository"
import { SellersRepository } from "../../sellers/infra/prisma/repositories/SellersRepository"
import CreateManyTransactionsController from "../infra/express/controllers/CreateManyTransactionsController"
import { TransactionsRepository } from "../infra/prisma/repositories/TransactionsRepository"
import { CreateManyTransactionsService } from "../services/CreateManyTransactionsService"

export const createManyTransactionsFactory = (): CreateManyTransactionsController => {
  const sellersRepository = new SellersRepository()
  const productsRepository = new ProductsRepository()

  const transactionsRepository = new TransactionsRepository()
  const service = new CreateManyTransactionsService(sellersRepository, productsRepository, transactionsRepository)
  return new CreateManyTransactionsController(service)
}
