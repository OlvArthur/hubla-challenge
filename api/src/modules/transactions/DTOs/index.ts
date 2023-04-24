export interface ICreateTransactionDTO {
  typeId: number
  date: Date
  valueInCents: number
  productId: number
  sellerId: number
}

export interface ICreateTransactionRequestDTO extends Omit<ICreateTransactionDTO, 'productId' | 'sellerId'> {
  productDescription: string
  sellerName: string
}
