import { useAuth } from '@/context/auth'

interface TransactionType {
  id: number,
  description: string,
  nature: "INFLOW" | "OUTFLOW"
  signal: "ADDITION" | "SUBTRACTION"
}

interface Product {
  id: number,
  description: string
}

interface Seller {
  id: number,
  email: string,
  name: string,
  isAdmin: boolean,
  isAffiliatedTo: null | number
}

interface Transaction {
    id: number
    typeId: number
    productId: number
    sellerId: number
    date: string
    valueInCents: number
    transactionType: TransactionType
    product: Product
    seller: Seller
}

interface BalanceTableProps {
  transactions: Transaction[];
}

export function BalanceTable({ transactions }:BalanceTableProps ) {
  const { seller } = useAuth()

  const formatValue = (balanceInCents?: number) => {
    const formatter = new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD'
    })

    if(!balanceInCents) return formatter.format(0)
    
    const value = formatter.format(balanceInCents / 100)
    
    return value
  }
  
  const balancePerSeller = transactions.reduce<{ [key: number]: number }>((acc, transaction) => {

    if(!acc[transaction.sellerId]) acc[transaction.sellerId] = 0

    
    if (transaction.transactionType.nature === 'INFLOW') {
      acc[transaction.sellerId]+= transaction.valueInCents
      return acc
    }

    acc[transaction.sellerId]-= transaction.valueInCents
    return acc
  }, {})

  const calculateAndFormatSellerBalance = (sellerId?: number) => {
    if(!sellerId) return formatValue(0)
    const balance = balancePerSeller[sellerId]

    return formatValue(balance)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 rounded-3xl mb-8">
        <h1 className="text-3xl font-bold text-gray-700">
          {seller?.isAdmin ? 'Admin View' : `Your balance: ${calculateAndFormatSellerBalance(seller?.id)}`}
        </h1>
        {!seller?.isAffiliatedTo && (
          <div className="mt-2">
            {seller?.affiliates.map(affiliate => (
              <div key={affiliate.name}>
                <span className="text-gray-600">{`${affiliate.name}: `}</span>
                <span>{calculateAndFormatSellerBalance(affiliate.id)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full max-w-screen-lg bg-white rounded-3xl shadow-lg">
        <div className="flex items-center justify-between w-full px-8 py-4 bg-gray-200 rounded-t-3xl">
          <h2 className="text-lg font-bold text-gray-700">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                  Transaction Type
                </th>
                <th className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                  Date
                </th>
                <th className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                  Product Description
                </th>
                <th className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                  Value
                </th>
                <th className="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-wider text-left">
                  Seller Name
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={`${transaction.id}`}>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                    {transaction.transactionType.description}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                    {transaction.product.description}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                    {`$${(transaction.valueInCents / 100).toFixed(2)}`}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                    {transaction.seller.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
};
  
export default BalanceTable;
  
  
  
