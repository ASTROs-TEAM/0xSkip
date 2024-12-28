'use client'

import useConnect from './useConnect'
import { ethers } from 'ethers'

const useSendTransaction = () => {
  const { connectWallet } = useConnect()

  const sendTransaction = async (
    to: string,
    amount: string
  ): Promise<string | null> => {
    const { txn_signer } = await connectWallet()

    if (!txn_signer) {
      console.error('No signer found')
      return null
    }

    try {
      const tx = await txn_signer.sendTransaction({
        to,
        value: ethers.parseEther(amount) // Convert ETH to Wei
      })

      const receipt: any = await tx.wait()

      return receipt.hash
    } catch (err: any) {
      console.log('err', err)
      return null
    }
  }

  return { sendTransaction }
}

export default useSendTransaction
