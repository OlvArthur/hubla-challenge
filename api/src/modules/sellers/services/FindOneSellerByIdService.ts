import { ISeller } from "../entitites/seller";
import { IFindOneSellerRepository } from "../repositories/IFindOneSellerRepository";
import { IFindOneSellerByIdService } from "./interfaces/IFindOneSellerByIdService";

class FindOneSellerByIdService implements IFindOneSellerByIdService {
  constructor(private sellersRepository: IFindOneSellerRepository) {}

  async execute(sellerId: number): Promise<ISeller> {
    const foundSeller = await this.sellersRepository.findById(sellerId)

    if(!foundSeller) throw new Error('No seller with this id was found')

    return foundSeller
  }
}

export default FindOneSellerByIdService
