import { Router } from 'express'
import { listTransactionsFactory, createManyTransactionsFactory } from '../../../factories'
import { adaptExpressRouter } from '../../../../../shared/infra/express/adapters'


import authMiddleware from '../../../../../shared/infra/express/middlewares/ValidateAuthMiddleware'

export const transactionsRouter = Router()


transactionsRouter.use(authMiddleware)

transactionsRouter.get('/',  adaptExpressRouter(listTransactionsFactory()))
transactionsRouter.post('/', adaptExpressRouter(createManyTransactionsFactory()))
