import { useAuth } from "../context/auth"

import styles from './BalanceReports.module.css'

export function BalanceReport() {
  const { seller } = useAuth()
  
  return (
    <div className="h-96 max-w-7xl mx-auto py-16 px-9 sm:px-12 lg:px-8">
      <div className={styles.balance}>
        <span>My Balance</span>
      </div>
      <div>
        <span> R${seller?.balance} </span>
      </div>

    </div>
  )
}