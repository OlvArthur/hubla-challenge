import { sign } from 'jsonwebtoken'

import authConfig from '../../../../../config/auth'

import { ITokenProvider } from '../interfaces/ITokenProvider'


export class JWTTokenProvider implements ITokenProvider{
  generateToken(payload: string): string {
    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      expiresIn,
      subject: payload
    }) 

    return token
  }
}
