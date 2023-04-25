import { SellersRepository } from "../../sellers/infra/prisma/repositories/SellersRepository"
import ListTransactionsController from "../infra/express/controllers/ListTransactionsController"
import { TransactionsRepository } from "../infra/prisma/repositories/TransactionsRepository"
import ListTransactionsService from "../services/ListTransactionsService"

export const listTransactionsFactory = (): ListTransactionsController => {
  const sellersRepository = new SellersRepository()

  const repository = new TransactionsRepository()
  const service = new ListTransactionsService(repository, sellersRepository)
  return new ListTransactionsController(service)
}
