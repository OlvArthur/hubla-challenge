import { BaseController } from '../../../../../shared/controller'
import { success } from '../../../../../shared/commons'
import { HttpRequest } from '../../../../../shared/interfaces'
import { IAuthenticateSellerService } from '../../../services/interfaces'

class AuthenticateSellerController implements BaseController {
  constructor(private authenticateSellerService: IAuthenticateSellerService){}

  async handle(httpRequest: HttpRequest) {
    const { email, password } = httpRequest.body

    const { token, seller } = await this.authenticateSellerService.execute({ email, password })

    const { password: sellerPassword, ...passwordlessSeller } = seller

    return success({ token, seller: passwordlessSeller })
  }
}

export default AuthenticateSellerController
