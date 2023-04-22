import ListTransactionsController from "../infra/express/controllers/ListTransactionsController"
import TransactionsRepository from "../infra/inMemoryDB/TransactionsRepository"
import ListTransactionsService from "../services/ListTransactionsService"

export const listTransactionsFactory = (): ListTransactionsController => {
  const repository = new TransactionsRepository()
  const service = new ListTransactionsService(repository)
  return new ListTransactionsController(service)
}
