import React from 'react';
import { assets } from '../assets/assets';


const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Right Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-normal text-base md:text-base">OUR BESTSELLER</p>
          </div>
          <h1 className=" prata-regular text-3xl sm:py-3 leading-relaxed">Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-normal text-base md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p> 
            i
          </div>
        </div>
      </div>

      {/* Left Side */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="Hero" />
    </div>
  );
};

export default Hero;
