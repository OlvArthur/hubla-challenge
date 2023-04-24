import { ISeller } from "../entitites/seller";

export interface IFindManySellersRepository {
  findByIds(sellerIds: number[]): Promise<ISeller[]>
  findByNames(sellerNames: string[]): Promise<ISeller[]>
}
