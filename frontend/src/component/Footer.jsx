import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div >
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm ">
                <div className="">

                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi perspiciatis dicta vitae, laborum est exercitationem, ab fugiat architecto veniam nostrum id ea vel, laboriosam amet mollitia minus accusamus obcaecati accusantium.
                    </p>

                </div>

                <div >
                    <p className="text-xl font-medium mb-5"> COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>about us</li>
                        <li>Delivery</li>
                        <li>Privicy  policy</li>

                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>get in touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>

                        <li>+1-212-456-7890</li>
                        <li>Contect@foreveryou.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className=" py-5 text-sm text-center "> Copyright 2025 forever.com- all Right Reserved< /p>

        </div >
    )
}

export default Footer
