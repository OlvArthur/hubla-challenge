import { ICreateTransactionDTO } from '../DTOs/ICreateTransactionDTO'

export interface ICreateManyTransactionsRepository {
  createMany(transactions: ICreateTransactionDTO[]): Promise<{ count: number }>
}
