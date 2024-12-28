import React from 'react'
import useWallet from './useWallet'
import { ethers } from 'ethers'

const useConnect = () => {
  const { setError, setSigner, setProvider, setAddress } = useWallet()

  const connectWallet = async (): Promise<any> => {
    let eth_provider
    let txn_signer = null
    try {
      // @ts-ignore
      if (!window?.ethereum) {
        console.log('MetaMask not installed; using read-only defaults')
        eth_provider = ethers.getDefaultProvider()
      }

      // @ts-ignore
      await window?.ethereum.request({ method: 'eth_requestAccounts' })

      // @ts-ignore
      eth_provider = new ethers.BrowserProvider(window.ethereum)

      txn_signer = await eth_provider.getSigner()
      const address = await txn_signer.getAddress()

      setAddress(address)
      setSigner(txn_signer)
      setProvider(eth_provider)

      return { eth_provider, txn_signer, address }
    } catch (err: any) {
      setError(err.message)
    }
  }
  return { connectWallet }
}

export default useConnect
