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

    if (!token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
          headers: {
            token
          }
        }
        );

      } catch (error) {
        console.error(error);
        toast.error(error.message);

      }
    }

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
    if (token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/update`,{ itemId, size, quantity }, {
          headers: { token}
        }
        );

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

        const response = await axios.post(`${backendUrl}/api/cart/get`, {
            headers: {
            token
            },
        });
        if (!token) {
          throw new Error("Token is missing or undefined");
      }else{
        console.log("API Response:", response.data);


      }


        
        // Handle the API response
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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setProducts,
    setToken, token,
    setCartItems

  };



  return (
    <Shopcontext.Provider value={value}>
      {children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
