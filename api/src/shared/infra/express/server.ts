import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import { swaggerDocument } from '../../../config/swagger'
import router from './router'
import AppError from '../../commons/AppError'

export const app = express()

const PORT = process.env.PORT ?? 5000


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())

app.use(router)

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details
    })
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
