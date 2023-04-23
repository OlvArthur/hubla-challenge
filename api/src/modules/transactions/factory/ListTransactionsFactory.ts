import SellersRepository from "../../sellers/infra/prisma/repositories/SellersRepository"
import FindOneSellerByIdService from "../../sellers/services/FindOneSellerByIdService"
import ListTransactionsController from "../infra/express/controllers/ListTransactionsController"
import TransactionsRepository from "../infra/prisma/repositories/TransactionsRepository"
import ListTransactionsService from "../services/ListTransactionsService"

export const listTransactionsFactory = (): ListTransactionsController => {
  const sellersRepository = new SellersRepository()
  const findOneSellerService = new FindOneSellerByIdService(sellersRepository)

  const repository = new TransactionsRepository()
  const service = new ListTransactionsService(repository, findOneSellerService)
  return new ListTransactionsController(service)
}
