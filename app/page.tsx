import Header from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Header />
      <Link href='/dashboard'>Dashboard </Link>
    </div>
  )
}
