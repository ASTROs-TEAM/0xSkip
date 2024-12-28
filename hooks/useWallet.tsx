'use client'

import { useState } from 'react'
import { JsonRpcSigner, BrowserProvider, ethers } from 'ethers'

const useWallet = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [provider, setProvider] = useState<BrowserProvider>()
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getAddress = async () => {
    if (!signer) {
      return null
    }
    return await signer.getAddress()
  }

  return {
    signer,
    setSigner,
    provider,
    setProvider,
    address,
    setAddress,
    error,
    setError
  }
}

export default useWallet
