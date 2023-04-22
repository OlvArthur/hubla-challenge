import { ITransaction } from "../entities/transaction"

export interface IListTransactionsRepository {
  listAllTransactions(): Promise<ITransaction[]>
  listCreatorTransactions(creatorId: number, creatorAffiliatesIds: number[]): Promise<ITransaction[]>
  listAffiliateTransactions(affiliateId: number): Promise<ITransaction[]>
}
