import Header from '@/components/Header'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Header />
      <div className='m-10'>
        <Link href={'/dashboard/my-habits'} className='hover:text-tertiary'>
          Dashboard
        </Link>
      </div>
    </div>
  )
}
