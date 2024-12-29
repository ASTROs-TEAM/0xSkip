'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNavBar = () => {
  const pathname = usePathname()

  return (
    <div className='sticky left-0 top-20 flex flex-col w-full h-[90vh] border-r-[1px] border-white/10 text-white'>
      <div className='flex-1 flex flex-col  space-y-4  p-4'>
        {['My Habits', 'Explore Habits', 'My Claims', 'Create New Habit'].map(
          (item, index) => {
            const isActive =
              pathname ===
              `/dashboard/${item.toLowerCase().split(' ').join('-')}`
            return (
              <Link
                key={index}
                href={`/dashboard/${item.toLowerCase().split(' ').join('-')}`}
                className={`${
                  isActive && 'bg-gray-800'
                } p-4 rounded-md text-center cursor-pointer `}
              >
                {item}
              </Link>
            )
          }
        )}
      </div>

      <div className='p-4 border-t border-gray-700'>
        <p className='text-sm text-gray-400'>Hello, User</p>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default SideNavBar
