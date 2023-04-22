import { ITransaction } from '../../entities/transaction'

export interface IListTransactionsService {
  execute(authenticatedSellerId: number): Promise<ITransaction[]>
}
