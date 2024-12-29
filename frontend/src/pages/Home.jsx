import React from 'react'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import Bestseller from '../component/Bestseller'
import Ourpolicy from '../component/Ourpolicy'
import NewletterBox from '../component/NewletterBox'


const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestseller/>
      <Ourpolicy/>
      <NewletterBox/>
    </div>
  )
}

export default Home
