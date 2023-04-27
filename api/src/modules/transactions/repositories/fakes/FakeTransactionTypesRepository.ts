import { ITransactionType } from "../../entities/transactionType";
import { IFindManyTransactionTypesRepository } from "../IFindManyTransactionTipesRepository";

export class FakeTransactionTypesRepository implements IFindManyTransactionTypesRepository {
  private types: ITransactionType[] = [
    {
      id: 1,
      description: 'Creator Sale',
      nature: 'INFLOW',
      signal: 'ADDITION'
    },
    {
      id: 2,
      description: 'Affiliate Sale',
      nature: 'INFLOW',
      signal: 'ADDITION'
    },
    {
      id: 3,
      description: 'Paid Commission',
      nature: 'OUTFLOW',
      signal: 'SUBTRACTION'
    },
    {
      id: 4,
      description: 'Received Commission',
      nature: 'INFLOW',
      signal: 'ADDITION'
    }
  ]

  async findByIds(ids: number[]): Promise<ITransactionType[]> {
    const types = this.types.filter(type => ids.includes(type.id))

    return types
  }
}
