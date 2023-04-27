import { ICreateTransactionDTO } from "../DTOs";

export interface ICreateManyTransactionsRepository {
  createMany(transactions: ICreateTransactionDTO[]): Promise<{ count: number }>
}
