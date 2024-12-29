import React from 'react'

const SideNavBar = () => {
  return (
    <div className='flex flex-col w-full h-full bg-gray-900 text-white'>
      <ul className='flex-1 space-y-4  p-4'>
        {['Dashboard', 'Send Transaction', 'Wallet Connect'].map(
          (item, index) => (
            <li
              key={index}
              className='bg-gray-800 p-4 rounded-md text-center cursor-pointer '
            >
              {item}
            </li>
          )
        )}
      </ul>

      <div className='p-4 border-t border-gray-700'>
        <p className='text-sm text-gray-400'>Hello, User</p>
      </div>
    </div>
  )
}

export default SideNavBar
