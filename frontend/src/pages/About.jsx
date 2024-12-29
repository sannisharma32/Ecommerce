import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../component/NewletterBox'


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className='w-full md:max-w-[480px]  ' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Welcome  where passion meets quality, and shopping becomes a seamless experience.We are a team of dedicated individuals with a singular vision: to redefine how you shop online. our mission is to bring you that combine quality, affordability, and style</p>
          <p>We’re excited to have you here and be part of your shopping journey. Join the thousands of satisfied customers who have made their favorite online store.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We aim to make your shopping journey fun, reliable, and memorable. Every day, we work to bring you the products you love, the service you deserve, and the satisfaction you expect.</p>
        </div>

      </div>

      <div className="text-4xl py-4">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'> We don’t compromise on quality—every product is carefully tested and vetted to ensure it meets the highest standards before it reaches your hands..</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenienus:</b>
          <p className='text-gray-600'> we believe that convenience is key. From browsing to checkout, we’ve made every step smooth, so you can focus on what matters most—finding what you love.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'> Our dedicated support team is always here to assist you, ensuring every question is answered and every concern is resolved with care and efficiency</p>

        </div>

      </div>


      <NewletterBox />

    </div>



  )
}

export default About
