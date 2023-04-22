import type { RequestHandler } from 'express';

import type { HttpRequest } from '../../../interfaces'
import { BaseController } from '../../../controller';

export const adaptExpressRouter = (controller: BaseController): RequestHandler => {
  return async (req, res, _) => {
    const request: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query
    }
    const { statusCode, body } = await controller.handle(request)
    return res.status(statusCode).json(body)
  }
}
