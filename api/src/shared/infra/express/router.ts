import { Router } from 'express'

import { transactionsRouter } from '../../../modules/transactions/infra/express/routes/transactions.routes'
import { sessionRouter } from '../../../modules/sellers/infra/express/routes/auth.routes'

const router = Router()

router.use('/transactions', transactionsRouter)
router.use('/login', sessionRouter)

router.get('/health-check', (_, response) => response.json({ message: 'Hello World'}))

export default router
