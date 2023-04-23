import { ISeller } from "../../entitites/seller";

export interface IFindOneSellerByIdService {
  execute(sellerId: number): Promise<ISeller>
}
