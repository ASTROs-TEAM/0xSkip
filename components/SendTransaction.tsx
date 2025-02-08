'use client'
import React, { useState } from 'react'
import useWallet from '@/hooks/useWallet'
import useSendTransaction from '@/hooks/useSendTransaction'

const SendETHComponent: React.FC = () => {
  const { error } = useWallet()
  const { sendTransaction } = useSendTransaction()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState<string | null>(null)

  const handleSendTransaction = async () => {
    if (!recipient || !amount) {
      alert('Please provide a valid recipient address and amount.')
      return
    }
    const hash = await sendTransaction(recipient, amount)
    if (hash) {
      setTxHash(hash)
    }

    if (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Recipient Address'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{ marginRight: '10px' }}
          className='text-black'
        />
        <input
          type='text'
          placeholder='Amount in ETH'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='text-black'
        />
        <button onClick={handleSendTransaction} style={{ marginLeft: '10px' }}>
          Send ETH
        </button>
      </div>
      {txHash && <p className='text-foreground'>Transaction Hash: {txHash}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SendETHComponent
