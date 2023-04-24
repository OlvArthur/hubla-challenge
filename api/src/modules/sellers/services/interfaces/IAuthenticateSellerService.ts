import { IAuthenticateSellerRequestDTO } from "modules/sellers/DTOs"
import { ISeller } from "../../entitites/seller"

export interface IAuthenticateSellerService {
  execute(sellerAuth: IAuthenticateSellerRequestDTO): Promise<{ seller: ISeller, token: string }>
}
