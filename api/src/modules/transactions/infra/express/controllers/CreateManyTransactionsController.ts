import { ICreateManyTransactionsService } from '../../../services/interfaces/ICreateManyTransactionsService'
import { created } from '../../../../../shared/commons'
import { HttpRequest } from '../../../../../shared/interfaces'


class CreateManyTransactionsController {
  constructor(private transactionsService: ICreateManyTransactionsService) {}

  async handle(httpRequest: HttpRequest) {
    const { transactions } = httpRequest.body

    const { count: createdTransactionsCount } = await this.transactionsService.execute(transactions)
    
    return created({ createdTransactionsCount })
  }
}

export default CreateManyTransactionsController
