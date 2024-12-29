import React from 'react'
import { assets } from '../src/assets/assets'

const Navbar = ({settoken}) => {
  return (
    <div className='flex justify-between items-center px-10 py-1'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />

        <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-sm sm:text-sm'>Logout</button>
      
    </div>
  )
}

export default Navbar
