import Header from '@/components/Header'
import SendETHComponent from '@/components/SendTransaction'
import WalletConnect from '@/components/WalletConnect'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Header />
      <Link href='/dashboard'>Dashboard </Link>
    </div>
  )
}
