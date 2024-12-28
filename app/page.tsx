import SendETHComponent from '@/components/SendTransaction'
import WalletConnect from '@/components/WalletConnect'

export default function Home() {
  return (
    <div>
      <h1 className='font-bricolage'>0xSkip</h1>
      <WalletConnect />
      <SendETHComponent />
    </div>
  )
}
