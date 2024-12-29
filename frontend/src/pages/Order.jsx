import React, { useContext } from "react";
import { Shopcontext } from "../context/ShopContext";
import Title from "../component/Title";

const Order = () => {
  const { products, currency } = useContext(Shopcontext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row gap-6"
            key={index}
          >
            {/* Product Image */}
            <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />

            {/* Product Details */}
            <div className="flex-1">
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className="flex items-center gap-3 mt-2 text-base text-gray-400">
                <p className="text-lg">
                  {currency}
                  {item.price}
                </p>
                <p>Quantity: 1</p>
                <p>Size: M</p>
              </div>
              <p className="mt-2">
                Date: <span className="text-gray-400">15, Dec, 2024</span>
              </p>
            </div>

            {/* Ready to Ship + Track Button */}
            <div className="flex items-center justify-between gap-6 md:gap-12 md:w-auto">
              <div className="flex items-center gap-2">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
              <button className="border py-2 px-4 font-medium text-sm rounded-sm">
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
