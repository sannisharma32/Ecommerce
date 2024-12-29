import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shopcontext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../component/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(Shopcontext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  const [size, setsize] = useState('')


  const fetchProductData = () => {
    // Find the product based on the productId
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set the first image as default
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]); // Re-run when productId or products change

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt={`Product image ${index + 1}`}
                  onClick={() => setImage(item)} // Set image on click
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[60%] lg:w-[75%] xl:w-[82%]">
            <img
              src={image}
              alt="Main product"
              className="w-full h-auto "
            />
          </div>
        </div>

        {/* Product Details (title, price, description, etc.) */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2 ">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">122</p>
          </div>
          <p className="mt-5  text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 ">
              {
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setsize(item)}
                    className={`border p-3  bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="bg-black   text-white sm:font-medium px-8 py-3 text-sm active:bg-gray-700 ">ADD TO CART   </button>
          <br className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-10 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery is avilable on this product,</p>
            <p>Easy return and exchange policy within 7 days</p>

          </div>

        </div>
      </div>
       {/*  discription list */}
       <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5  py-3 text-sm '> Reviews(112)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
          <p>Discover  your go-to online store for quality products at great prices. From fashion and electronics to home essentials, we’ve got it all. Enjoy secure payments, fast delivery, and unbeatable deals. Shop with ease and confidence—where customer satisfaction is our top priority</p>
            <p>"Shop at [Your Website Name] for quality products, amazing deals, and fast delivery. From fashion to home essentials, we prioritize secure payments and customer satisfaction for a seamless shopping experience."</p>
        </div>

       </div>
       {/*  display related product*/}
              <RelatedProduct category={productData.category} subcategory={productData.subcategory} />


       <div className=""></div>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div> // Display loading message if no data yet
  );
};

export default Product;
