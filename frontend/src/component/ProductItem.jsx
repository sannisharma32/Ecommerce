import React, { useContext } from 'react';
import { Shopcontext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(Shopcontext);

  return (
    <div>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image[0]}
            className="w-full h-50 sm:h-46 md:h-56 lg:h-62 xl:h-62 object-cover hover:scale-110 transition ease-in-out"
            alt={name}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
