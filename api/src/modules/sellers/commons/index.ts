import { ISeller } from "../entitites/seller"

type SellerWithBalance<T> = T & {
  balance: number
} 

export const computeBalance = (seller: ISeller | null): SellerWithBalance<ISeller> | null => {
  if(!seller) return null
  
  const balance = seller.transactions.reduce((acc, transaction) => {
    if (transaction.transactionType.nature === 'INFLOW') return acc+transaction.valueInCents
    
    return acc-transaction.valueInCents
  }, 0)
  
  return {
    ...seller,
    balance
  }
}
