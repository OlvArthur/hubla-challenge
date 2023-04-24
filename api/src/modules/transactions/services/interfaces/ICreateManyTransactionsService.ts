import { ICreateTransactionDTO } from "../../DTOs/ICreateTransactionDTO";

export interface ICreateManyTransactionsService {
  execute(transactions: ICreateTransactionDTO[]): Promise<{ count: number }>
}
