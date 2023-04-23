import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'

import router from './router'
import AppError from '../../commons/AppError'

const app = express()

const PORT = 5000

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
