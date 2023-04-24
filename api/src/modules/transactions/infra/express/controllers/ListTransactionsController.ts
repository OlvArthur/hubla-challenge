import { IListTransactionsService } from '../../../services/interfaces/IListTransactionsService'
import { success } from '../../../../../shared/commons'
import { HttpRequest } from '../../../../../shared/interfaces'


class ListTransactionsController {
  constructor(private listTransactionsService: IListTransactionsService) {}

  async handle(httpRequest: HttpRequest) {
    const { id: authenticatedSellerId } = httpRequest.user

    const transactions = await this.listTransactionsService.execute(Number(authenticatedSellerId))

    transactions.forEach(transaction => {
      const {password, ...rest} = transaction.seller
      
      Object.assign(transaction, {
        seller: rest
      })
    })
    
    return success({ transactions })
  }
}

export default ListTransactionsController
