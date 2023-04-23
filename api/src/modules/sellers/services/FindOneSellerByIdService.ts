import AppError from "../../../shared/commons/AppError";
import { ISeller } from "../entitites/seller";
import { IFindOneSellerRepository } from "../repositories/IFindOneSellerRepository";
import { IFindOneSellerByIdService } from "./interfaces/IFindOneSellerByIdService";
import { StatusCode } from '../../../shared/commons'

class FindOneSellerByIdService implements IFindOneSellerByIdService {
  constructor(private sellersRepository: IFindOneSellerRepository) {}

  async execute(sellerId: number): Promise<ISeller> {
    const foundSeller = await this.sellersRepository.findById(sellerId)

    if(!foundSeller) throw new AppError('No seller with this id was found', StatusCode.NOT_FOUND, { sellerId: sellerId })

    return foundSeller
  }
}

export default FindOneSellerByIdService
