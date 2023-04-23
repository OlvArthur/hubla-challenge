import { ITransaction } from "../../transactions/entities/transaction"

export interface ISeller {
  id: number
  name: string
  isAdmin: Boolean
  isAffiliatedTo?: number | null
  creator?: ISeller
  affiliates: ISeller[]
  transactions: ITransaction[]
}

