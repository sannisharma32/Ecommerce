import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/ShopContext'
import Title from '../component/Title'
import { assets } from '../assets/assets';
import CartTotal from '../component/CartTotal';

const Cart = () => {
  const { products, currency, CartItems, updateQuantity ,navigate} = useContext(Shopcontext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in CartItems) {
      for (const size in CartItems[productId]) {
        if (CartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size, // Corrected this line
            quantity: CartItems[productId][size], // Quantity is being accessed properly
          });
        }
      }
    }
    setCartData(tempData);
  }, [CartItems, products]); // Corrected the dependency array to include CartItems and products

  return (
    <div className="border-t pt-4">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={"Cart"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid-cols-[4fr_0fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex  items-start gap-20">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  {/* Display the size and quantity */}
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className='border sm:px-2 sm:py-1 bg-slate-50'>{item.size}</p>
                  </div>
                </div>

                <input type="number"

                  onClick={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}

                  min={1}
                  defaultValue={item.quantity}
                  className='border max-w-10 sm:max-w-20 px-1 py-1   '

                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}

                  src={assets.bin_icon} alt=""
                  className="w-4 mr-4 sm:w-5 cursor-pointer"

                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className='w-full text-end'> 
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
