import { ICreateTransactionRequestDTO } from "../../DTOs";

export interface ICreateManyTransactionsService {
  execute(transactions: ICreateTransactionRequestDTO[]): Promise<{ count: number }>
}
