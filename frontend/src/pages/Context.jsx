import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../component/NewletterBox'

const Context = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row  gap-12 mb-28">

        <img src={assets.contact_img} className='w-full md:max-w-[480px] ' alt="" />
        <div className="flex flex-col justify-center items-start gap-4 ">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className="text-gray-500">Piplani sonagiri bhopal 42202 <br /> Madhy,pardesh,India</p>
          <p className='text-gray-500'>Mobile : 7960804041 <br /> email: foreveradmin@gmail.com</p>
          <p className='text-gray-600 font-bold'>Careers at Forever</p>
          <p className='text-gray-500'> Learn more about teams and jobs opening.</p>
          <button className='border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-500  '>Explore jobs</button>
        </div>
      </div>
      <NewletterBox />
    </div>
  )
}

export default Context
