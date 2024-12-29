'use client'
import useConnect from '@/hooks/useConnect'
import { verifyMessage } from 'ethers'

const useSignMessage = () => {
  const { connectWallet } = useConnect()

  const signMessage = async (message: string) => {
    const { txn_signer } = await connectWallet()

    console.log('signer:', txn_signer)

    // Signing the message
    const sig = await txn_signer.signMessage(message)

    const verified = verifyMessage(message, sig) === txn_signer.address

    return { verified }
  }

  return { signMessage }
}

export default useSignMessage
