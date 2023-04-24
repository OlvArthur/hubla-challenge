import { Seller, Transaction, TransactionType } from "../../../shared/infra/prisma/client"

type TransactionWithType = Transaction & { transactionType: TransactionType }

export interface ISeller extends Seller {
  creator?: Seller
  affiliates: Seller[]
  transactions: TransactionWithType[]
  balance?: number
}

