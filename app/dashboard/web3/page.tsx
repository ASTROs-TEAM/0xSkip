'use client'
import { Input } from '@/components/ui/input'
import useSignMessage from '@/hooks/useSignMessage'
import React, { useState } from 'react'

const page = () => {
  const [message, setMessage] = useState('')

  const { signMessage } = useSignMessage()

  const handleSignMessage = async () => {
    const { verified } = await signMessage(message)
    console.log('verified:', verified)
  }

  return (
    <div>
      <Input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSignMessage}>Sign Message</button>
    </div>
  )
}

export default page
