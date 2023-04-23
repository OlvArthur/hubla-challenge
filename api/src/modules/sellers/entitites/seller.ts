import { Seller, Transaction } from "../../../shared/infra/prisma/client"

export interface ISeller extends Seller {
  creator?: Seller
  affiliates: Seller[]
  transactions: Transaction[]
}

