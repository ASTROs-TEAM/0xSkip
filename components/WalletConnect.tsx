'use client'
import useConnect from '@/hooks/useConnect'
import useWallet from '@/hooks/useWallet'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const WalletConnect: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const { address, error } = useWallet()
  const { connectWallet } = useConnect()

  const handleWalletConnect = async () => {
    const { address } = await connectWallet()
    //@ts-ignore
    setWalletAddress(address.toString().substring(0, 10) + '...')
  }

  return (
    <div>
      {walletAddress ? (
        <p>
          {walletAddress}
          {/* <DropdownMenu>
            <DropdownMenuTrigger>{walletAddress}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </p>
      ) : (
        <Button
          onClick={handleWalletConnect}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          {walletAddress ? 'Connected' : 'Connect Wallet'}
        </Button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default WalletConnect
