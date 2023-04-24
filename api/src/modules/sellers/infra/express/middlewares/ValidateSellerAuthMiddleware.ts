import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../../../../../config/auth'
import AppError from '../../../../../shared/commons/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

const validatedUserAuth = (request: Request, _: Response, next: NextFunction) => {
  const { authorization } = request.headers

  if(!authorization) throw new AppError('Missing JWT token', 401)

  const [, token] = authorization?.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}

export default validatedUserAuth
