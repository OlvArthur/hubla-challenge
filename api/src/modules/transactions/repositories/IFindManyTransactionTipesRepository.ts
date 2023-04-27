import { ITransactionType } from "../entities/transactionType";

export interface IFindManyTransactionTypesRepository {
  findByIds(ids: number[]): Promise<ITransactionType[]>
}
