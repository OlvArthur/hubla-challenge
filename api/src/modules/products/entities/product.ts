import { Product, Transaction } from "../../../shared/infra/prisma/client";

export interface IProduct extends Product {
  transactions: Transaction[]
}

