import { ICreateTransactionDTO } from "../../DTOs/ICreateTransactionDTO";
import { ITransaction } from "../../entities/transaction";
import { ICreateManyTransactionsRepository } from "../ICreateManyTransactionsRepository";
import { IListTransactionsRepository } from "../IListTransactionsRepository";
import { TransactionType, Product, Seller } from "../../../../shared/infra/prisma/client";

class FakeTransactionsRepository implements IListTransactionsRepository, ICreateManyTransactionsRepository {
  private transactions: ITransaction[] = [
    {
      id: 1,
      date: new Date(),
      productId: 2,
      sellerId: 6,
      typeId: 2,
      valueInCents: 1234,
      transactionType: {} as TransactionType,
      product: {} as Product,
      seller: {} as Seller
    },
    {
      id: 2,
      date: new Date(),
      productId: 2,
      sellerId: 3,
      typeId: 2,
      valueInCents: 496,
      transactionType: {} as TransactionType,
      product: {} as Product,
      seller: {} as Seller
    },
    {
      id: 3,
      date: new Date(),
      productId: 2,
      sellerId: 2,
      typeId: 2,
      valueInCents: 7449,
      transactionType: {} as TransactionType,
      product: {} as Product,
      seller: {} as Seller
    },
    {
      id: 4,
      date: new Date(),
      productId: 2,
      sellerId: 3,
      typeId: 2,
      valueInCents: 4847,
      transactionType: {} as TransactionType,
      product: {} as Product,
      seller: {} as Seller
    },
  ]

  async createMany(transactions: ICreateTransactionDTO[]): Promise<{ count: number; }> {
    let highestTransactionId = this.transactions.length
    
    const createdTransactions: ITransaction[] = transactions.map(transaction => {
      highestTransactionId++

      return {
        id: highestTransactionId,
        productId: transaction.productId ?? -1,
        sellerId: transaction.sellerId ?? -1,
        typeId: transaction.typeId,
        valueInCents: transaction.valueInCents,
        date: transaction.date,
        transactionType: {} as TransactionType,
        product: {} as Product,
        seller: {} as Seller
      }
    })

    this.transactions.concat(createdTransactions)

    return { count: createdTransactions.length }
  }

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
