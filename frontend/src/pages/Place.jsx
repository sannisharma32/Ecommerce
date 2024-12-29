import React, { useContext } from 'react'
import { useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/assets'
import { Shopcontext } from '../context/ShopContext'


const Place = () => {
  const [method, setmethod] = useState('cod')
  const {navigate} =useContext(Shopcontext)


  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh]'>
      {/**left side */}
      <div className="flex flex-col  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input placeholder='First name' className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" />
          <input placeholder='Last name' className='border border-gray-300 outline-none rounded py-1.5 px-3.5l w-full' type="text" />
        </div>
        <input className='border border-gray-300 rounded mt-2 py-1.5 px-3.5 w-full outline-none' type="email" placeholder='Email adress' />
        <input type="text" className='border border-gray-300  rounded my-2 py-1.5 px-3.5 w-full outline-none' placeholder='Street' />
        <div className='flex gap-3'>
          <input placeholder='City' className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" />
          <input placeholder='State' className='border border-gray-300 outline-none rounded py-1.5 px-3.5l w-full' type="text" />
        </div>
        <div className='flex mt-2 gap-3'>
          <input placeholder='Pin code' className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="number" />
          <input placeholder='Country' className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" />
        </div>
        <input placeholder='Mobile Number' className='border border-gray-300 outline-none mt-2 rounded py-1.5 px-3.5 w-full' type="number" />

      </div>
      {/**right side */}

      <div className="mt-8">

        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className="mt-12">
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        {/*pyment selection secletion */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div onClick={()=>setmethod('strip')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5  h-3.5 border rounded-full ${method =='strip' ? 'bg-green-400 ': ""}`}> </p>
              <img className='h-5 mx-4 ' src={assets.stripe_logo} alt="" />
            
          </div>
          <div onClick={()=>setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5  h-3.5  border rounded-full ${method =='razorpay' ? 'bg-green-400' : ""}`}></p>
              <img className='h-5 mx-4 ' src={assets.razorpay_logo} alt="" />
            
          </div>
          <div onClick={()=>setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5  border rounded-full ${method =='cod' ? 'bg-green-400 ': ""}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
        <button  onClick={()=>navigate('/order')} className='bg-black px-16 py-3 text-white'>PLACE ORDER</button>
      </div>


        </div>
      </div>
      
    </div>

  )
}

export default Place
