import Header from '@/components/Header'
import SideNavBar from '@/components/SideNavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header dashboard />
      <div className='grid grid-cols-[25%_75%]'>
        <SideNavBar />
        <div className=''>{children}</div>
      </div>
    </>
  )
}
