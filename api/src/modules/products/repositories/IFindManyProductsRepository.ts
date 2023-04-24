import { IProduct } from "../entities/product";

export interface IFindManyProductsRepository {
  findByDescriptions(productDescriptions: string[]): Promise<IProduct[]>
}
