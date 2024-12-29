import Header from '@/components/Header'
import SideNavBar from '@/components/SideNavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header dashboard />
      <div className='flex min-h-[80dvh]'>
        <div className='flex-[0.25]'>
          <SideNavBar />
        </div>
        <div className='flex-[0.5] bg-amber-50'>{children}</div>
        <div className='flex-[0.25] bg-orange-400'>Right Bar</div>
      </div>
    </>
  )
}
