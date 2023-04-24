import AuthenticateSellerController from "../infra/express/controllers/AuthenticateSellerController"
import SellersRepository from "../infra/prisma/repositories/SellersRepository"
import AuthenticateSellerService from "../services/AuthenticateSellerService"
import JWTokenProvider from "../providers/AuthTokenProvider/implementations/JsonWebTokenProvider"

export const authenticateSellerFactory = (): AuthenticateSellerController => {
  const authTokenProvider = new JWTokenProvider()
  const sellersRepository = new SellersRepository()
  const service = new AuthenticateSellerService(sellersRepository,authTokenProvider)
  return new AuthenticateSellerController(service)
}
