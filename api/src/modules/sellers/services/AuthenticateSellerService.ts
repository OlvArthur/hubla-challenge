import { compare } from 'bcryptjs'

import { IFindOneSellerRepository } from "../repositories/IFindOneSellerRepository"
import { IAuthenticateSellerService } from "./interfaces"
import AppError from '../../../shared/commons/AppError'
import { ITokenProvider } from "../providers/AuthTokenProvider/interfaces/ITokenProvider"
import { IAuthenticateSellerRequestDTO } from "../DTOs"
import { StatusCode } from '../../../shared/commons'


class AuthenticateSellerService implements IAuthenticateSellerService {
  constructor(private sellersRepository: IFindOneSellerRepository, private authTokenProvider: ITokenProvider) {}
  
  public async execute({ email, password }: IAuthenticateSellerRequestDTO) {
    const seller = await this.sellersRepository.findByEmail(email)

    if(!seller) throw new AppError('Login Failed: invalid username or password', StatusCode.BAD_REQUEST)

    const checkPassword = await compare(password, seller.password)

    if (!checkPassword) throw new AppError('Login failed: Invalid username or password', StatusCode.BAD_REQUEST)

    const token = this.authTokenProvider.generateToken(JSON.stringify(seller.id))

    return { seller, token }
  }
}

export default AuthenticateSellerService
