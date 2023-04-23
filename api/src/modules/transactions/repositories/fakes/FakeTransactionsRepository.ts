import { ITransaction } from "../../entities/transaction";
import { IListTransactionsRepository } from "../IListTransactionsRepository";

class FakeTransactionsRepository implements IListTransactionsRepository {
  private transactions: ITransaction[] = [
    {
      id: 1,
      date: new Date(),
      productId: 2,
      sellerId: 6,
      typeId: 2,
      valueInCents: 1234
    },
    {
      id: 2,
      date: new Date(),
      productId: 2,
      sellerId: 3,
      typeId: 2,
      valueInCents: 496
    },
    {
      id: 3,
      date: new Date(),
      productId: 2,
      sellerId: 2,
      typeId: 2,
      valueInCents: 7449
    },
    {
      id: 4,
      date: new Date(),
      productId: 2,
      sellerId: 3,
      typeId: 2,
      valueInCents: 4847
    },
  ]

  public async listAllTransactions(): Promise<ITransaction[]> {
    return this.transactions
  }

  public async listCreatorTransactions(creatorId: number, creatorAffiliatesIds: number[]): Promise<ITransaction[]> {
    const creatorTransactions = this.transactions.filter(transaction => creatorAffiliatesIds.concat([creatorId]).includes(transaction.sellerId))
  
    return creatorTransactions
  }

  public async listAffiliateTransactions(affiliateId: number): Promise<ITransaction[]> {
    const affiliateTransactions = this.transactions.filter(transaction => transaction.sellerId === affiliateId)

    return affiliateTransactions
  }
}

export default FakeTransactionsRepository
