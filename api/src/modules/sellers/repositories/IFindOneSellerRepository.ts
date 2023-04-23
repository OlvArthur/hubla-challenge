import { ISeller } from "../entitites/seller";

export interface IFindOneSellerRepository {
  findById(sellerId: number): Promise<ISeller | null>
  findByName(sellerName: string): Promise<ISeller | null>
}
