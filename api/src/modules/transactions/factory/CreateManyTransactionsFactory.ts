import CreateManyTransactionsController from "../infra/express/controllers/CreateManyTransactionsController"
import TransactionsRepository from "../infra/prisma/repositories/TransactionsRepository"
import CreateManyTransactionsService from "../services/CreateManyTransactionsService"

export const createManyTransactionsFactory = (): CreateManyTransactionsController => {
  const repository = new TransactionsRepository()
  const service = new CreateManyTransactionsService(repository)
  return new CreateManyTransactionsController(service)
}
