import { Router } from 'express'

import { adaptExpressRouter } from '../../../../../shared/infra/express/adapters'

import { authenticateSellerFactory } from '../../../factories/AuthenticateSellerFactory'

export const sessionRouter = Router()

sessionRouter.post('/', adaptExpressRouter(authenticateSellerFactory()))

