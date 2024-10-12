import React from 'react'
import { WalletSelector } from './Wallet-Selector'

const Wallet = () => {
  return (
    <div className="absolute right-10 top-6 z-50">
      <WalletSelector />
    </div>
  )
}

export default Wallet