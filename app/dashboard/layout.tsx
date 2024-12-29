import Header from '@/components/Header'
import RightPanel from '@/components/RightPanel'
import SideNavBar from '@/components/SideNavBar'
import SideBarContextProvider from '@/context/sideBarContext'

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
