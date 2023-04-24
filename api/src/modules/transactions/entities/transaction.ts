import { TransactionType, Transaction, Product, Seller } from "../../../shared/infra/prisma/client"

export interface ITransaction extends Transaction {
  transactionType: TransactionType
  product: Product
  seller: Seller
}
