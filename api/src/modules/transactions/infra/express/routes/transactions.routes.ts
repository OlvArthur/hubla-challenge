import { Router } from 'express'
import { listTransactionsFactory } from '../../../factory/ListTransactionsFactory'
import { adaptExpressRouter } from '../../../../../shared/infra/express/adapters'


export const transactionsRouter = Router()


transactionsRouter.get('/', adaptExpressRouter(listTransactionsFactory()))
