import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around  text-center gap-12 sm:gap-2 py-20 text-xs sm:text-sm md:text-base text-gray-700  '>
         
         <div className="  ">
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5 '  />
            <p className=' font-semibold'>Easy Exchange Policy</p>
            <p className=' text-gray-400'>we offfer haslle free exchange policy</p>
         </div>
         <div className="  ">
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5 '  />
            <p className=' font-semibold'>7 Day Return Policy</p>
            <p className=' text-gray-400'>We provide 7 day free return policy</p>
         </div>
         <div className="  ">
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5 '  />
            <p className=' font-semibold'>Best Customer suport</p>
            <p className=' text-gray-400'>we provide 24/7 customer support</p>
         </div>
    </div>
  )
}

export default Ourpolicy
