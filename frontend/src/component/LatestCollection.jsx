import React, { useContext, useEffect ,useState} from 'react'
import { Shopcontext } from '../context/ShopContext'
import { products } from '../assets/assets';
import Title from './Title';
import Collection from '../pages/Collection';
import ProductItem from './ProductItem';


const LatestCollection = () => {

const {products} =useContext(Shopcontext);

const [latestproduct, setlatestproduct] = useState([]);

useEffect(() => {
  setlatestproduct(products.slice(0,10));

 
}, []);

    
    
    return (
      <div className="my-10">
        <div className="text-center py-8  text-3xl">
          <Title text1={'LATEST'} text2={'Collection'}/>
          <p className=' w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'>
          Step into a world of style and innovation with our newest arrivals.
          </p>


        </div>

        {/*  rendiring product*/}
        <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">

          {
            latestproduct.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }


        </div>

      </div>
     
    );
}

export default LatestCollection
