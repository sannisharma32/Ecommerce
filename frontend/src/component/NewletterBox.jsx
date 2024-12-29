import React from 'react'

const NewletterBox = () => {

    const  onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className=' text-center'>
        <p className=' text-2xl font-medium text-green-800 ' > Subscribe now & get 20% offer </p>
        <p className="text-gray-400 mt-3 ">
        Shop Now, Grab the Deal, Don't Miss Out, Limited Time Offer, Hurry, While Stocks Last.
        </p>
        <form className='w-full sm:w1/2 flex items-center gap-3 my-6 border pl-3' >
            <input type="email" className='w-full sm:flex-1 outline-none ' placeholder='Enter your email'  required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4' >SUBSCRIB </button>
        </form>

      
    </div>
  )
}

export default NewletterBox
