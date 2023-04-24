export interface ICreateTransactionDTO {
  typeId: number
  date: Date
  valueInCents: number
  productDescription: string
  productId: number
  sellerName: string
  sellerId: number
}
