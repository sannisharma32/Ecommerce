import React, { useState,useContext, useEffect } from "react";
import { Shopcontext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";

const Order = () => {
  const { backendUrl,token, currency } = useContext(Shopcontext);
  const [orderData, setorderData] = useState([])

  const loadOrderData = async ( )=>{
    try {
      if(!token){
        return null;

      }
      const response = await axios.post(`${backendUrl}/api/order/userorders`,{},{headers:{token}})
      console.log(response.data)
      
     if(response.data){
      let allOrdersItem=[];
      response.data.orders.map((order)=>{
        order.item.map((item)=>{
          item['status']=order.status
          item['payment']=order.payment
          item['PaymentMethod']=order.PaymentMethod
          item['date']=order.date
          allOrdersItem.push(item)
        })
      })
      setorderData(allOrdersItem.reverse())
      

     }

    } catch (error) {
      
    }

  }

  useEffect(() => {
    
    loadOrderData();
  
    
  }, [token])
  

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row gap-6"
            key={index}
          >
            {/* Product Image */}
            <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />

            {/* Product Details */}
            <div className="flex-1">
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className="flex items-center gap-3 mt-1 text-base text-gray-400">
                <p>
                  {currency}
                  {item.price}
                </p>
                <p>Quantity:{item.quantity} </p>
                <p>Size: {item.size}</p>
              </div>
              <p className="mt-1">
                Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
              </p>
              <p className="mt-1">
                payment: <span className="text-gray-400">{item.PaymentMethod||'null'}</span>
              </p>

            </div>

            {/* Ready to Ship + Track Button */}
            <div className="flex items-center justify-between gap-6 md:gap-12 md:w-auto">
              <div className="flex items-center gap-2">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border py-2 px-4 font-medium text-sm rounded-sm">
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
