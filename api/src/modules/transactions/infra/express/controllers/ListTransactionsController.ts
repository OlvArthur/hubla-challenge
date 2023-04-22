import { IListTransactionsService } from '../../../services/interfaces/IListTransactionsService'
import { success } from '../../../../../shared/commons'
import { HttpRequest } from '../../../../../shared/interfaces'


class ListTransactionsController {
  constructor(private listTransactionsService: IListTransactionsService) {}

  async handle(httpRequest: HttpRequest) {
    const transactions = await this.listTransactionsService.execute(2)
    
    return success({ transactions })
  }
}

export default ListTransactionsController
