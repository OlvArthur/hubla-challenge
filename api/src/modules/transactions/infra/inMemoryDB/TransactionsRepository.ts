import { ITransaction } from '../../entities/transaction' 
import { IListTransactionsRepository } from '../../repositories/IListTransactionsRepository'

class TransactionsRepository implements IListTransactionsRepository {
  private transactions: ITransaction[] = [{
    id: 1,
    date: new Date(),
    productId: 2,
    sellerId: 4,
    typeId: 2,
    value: 1234
  }]


  public async listAllTransactions(): Promise<ITransaction[]> {
    return this.transactions
  }

  public async listCreatorTransactions(creatorId: number, creatorAffiliatesIds: number[]): Promise<ITransaction[]> {
    const creatorTransactions = this.transactions.filter(transaction => [creatorId, ...creatorAffiliatesIds].includes(transaction.sellerId))
  
    return creatorTransactions
  }

  public async listAffiliateTransactions(affiliateId: number): Promise<ITransaction[]> {
    const affiliateTransactions = this.transactions.filter(transaction => transaction.sellerId === affiliateId)

    return affiliateTransactions
  }
}

export default TransactionsRepository
