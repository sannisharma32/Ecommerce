import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets"; // Make sure this import is correct
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Shopcontext = createContext();

const ShopcontextProvider = ({ children }) => {
  const currency = '₹';
  const delivery_fee = 40;
  const [search, setsearch] = useState('');
  const [showSearch, setshowSearch] = useState(false);

  const [CartItems, setCartItems] = useState({});

  const navigate=useNavigate();

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Product size')
      return;

    }

    let CartData = structuredClone(CartItems)

    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;

      } else {
        CartData[itemId][size] = 1;
      }

    } else {
      CartData[itemId] = {}
      CartData[itemId][size] = 1
    }
    setCartItems(CartData);



  }

  useEffect(() => {

    console.log(CartItems);

  }, [])


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in CartItems) {
      for (const item in CartItems[items]) {
        try {
          if (CartItems[items][item] > 0) {
            totalCount += CartItems[items][item]
          }
        }
        catch {

        }
      }

    }
    return totalCount;


  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(CartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

  }
  const getCartAmount = () => {
    let totalamount = 0;
    for (const items in CartItems) {
      let itemInfo = products.find((product) => product._id === items)
      for (const item in CartItems[items]) {
        try {
          if (CartItems[items][item] > 0) {
            totalamount += itemInfo.price * CartItems[items][item];
          }

        } catch (error) {

        }
      }
    }
    return totalamount;
  }


  const value = {
    products,
    currency,
    delivery_fee,
    search, showSearch, setsearch, setshowSearch,
    CartItems, addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    
  };



  return (
    <Shopcontext.Provider value={value}>
      {children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
