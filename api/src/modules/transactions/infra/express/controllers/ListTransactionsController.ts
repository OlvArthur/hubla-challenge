import { IListTransactionsService } from '../../../services/interfaces/IListTransactionsService'
import { success } from '../../../../../shared/commons'
import { HttpRequest } from '../../../../../shared/interfaces'


class ListTransactionsController {
  constructor(private listTransactionsService: IListTransactionsService) {}

  async handle(httpRequest: HttpRequest) {
    const { authenticatedSellerId } = httpRequest.user

    const transactions = await this.listTransactionsService.execute(authenticatedSellerId)
    
    return success({ transactions })
  }
}

export default ListTransactionsController
