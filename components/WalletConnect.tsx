'use client'
import useConnect from '@/hooks/useConnect'
import useWallet from '@/hooks/useWallet'
import { useState } from 'react'

const WalletConnect: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const { address, error } = useWallet()
  const { connectWallet } = useConnect()

  const handleWalletConnect = async () => {
    const { address } = await connectWallet()
    setWalletAddress(address)
  }

  return (
    <div>
      <button
        onClick={handleWalletConnect}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {walletAddress ? 'Connected' : 'Connect Wallet'}
      </button>
      {walletAddress && <p>Connected Address: {walletAddress}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default WalletConnect
