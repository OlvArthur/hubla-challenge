import { ISeller } from "../entitites/seller";

export interface IFindOneSellerRepository {
  findById(id: number): Promise<ISeller | null>
  findByName(name: string): Promise<ISeller | null>
  findByEmail(email: string): Promise<ISeller | null>
}
