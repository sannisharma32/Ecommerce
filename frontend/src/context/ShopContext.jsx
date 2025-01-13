import React, { createContext, useState, useEffect } from "react";
// Make sure this import is correct
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";


export const Shopcontext = createContext();

const ShopcontextProvider = ({ children }) => {
  const currency = '₹';
  const delivery_fee = 40;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState('');
  const [showSearch, setshowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState({});
  const [token, setToken] = useState('')

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product size');
      return;
    }
  
    // Create a deep clone of CartItems
    let CartData = structuredClone(CartItems);
  
    // Update the CartData with the item and size
    if (!CartData[itemId]) {
      CartData[itemId] = {};
    }
    CartData[itemId][size] = (CartData[itemId][size] || 0) + 1;
  
    // Update state
    setCartItems(CartData);
  
    // Log the updated cart (use CartData instead of CartItems)
    console.log('Updated Cart:', CartData);
  
    // Only make API call if token exists
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              token,
            },
          }
        );
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('API Error:', error);
        toast.error(error.response?.data?.message || error.message || 'An error occurred');
      }
    }
  };
  

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
  const updateQuantity = async ( itemId, size, quantity) => {
    let cartData = structuredClone(CartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/update`,{itemId, size, quantity }, {
          headers: { token}
        }
        );
        console.log(response.data);
      

      } catch (error) {
        console.error(error);
        toast.error(error.message);

      }

    }

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
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("API Response:", response.data);
      if (response.data.success) {
        setProducts(response.data.product);
        console.log("Products:", products);
      } else {
        toast.error("Error in fetching data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
        const response = await axios.post(
            `${backendUrl}/api/cart/get`, 
            {}, // Empty object, since you're not sending any data in the body
            {
                headers: {
                    token: token // Add token to headers here
                }
            }
        );
        
        console.log("API Response:", response.data);
        if (response.data.success) {
            setCartItems(response.data.cartData); // Update state
            console.log("Cart Items:", response.data.cartData); // Log the updated data
        } else {
            toast.error("Error in fetching cart data");
        }
    } catch (error) {
        console.error("Error in getUserCart:", error); // Log error for debugging
        toast.error("Failed to fetch cart data. Please try again later.");
    }
};




  useEffect(() => {
    getProductData();
    console.log("Products:", products);
  

  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
      

    }
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search, showSearch, setsearch, setshowSearch,
    CartItems, addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setProducts,
    setToken, token,

  };



  return (
    <Shopcontext.Provider value={value}>
      {children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
