import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import { assets } from '../assets/assets';
import { Shopcontext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Place = () => {
  const [method, setmethod] = useState('cod');
  const { navigate, backendUrl, CartItems, token, setCartItems, getCartAmount, delivery_fee, products } = useContext(Shopcontext);

  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    // Validate the order object
    if (!order || !order.amount || !order.currency || !order.id || !order.receipt) {
      toast.error("Invalid order details");
      return;
    }
  
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Razorpay Response:", response);
  
        try {
          // Validate the presence of token
          if (!token) {
            toast.error("User token is missing. Please log in again.");
            return;
          }
  
          // Verify payment with backend
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            {
              headers: {
                token, // Add token for authentication
              },
            }
          );
  
          if (data.success) {
            toast.success("Payment Successful");
            navigate('/order');
            setCartItems({}); // Clear the cart items
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      },
      prefill: {
        name: "Your Name", // Optionally prefill user details
        email: "email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc", // Customize the payment window theme
      },
    };
  
    // Check if Razorpay is loaded
    if (typeof window.Razorpay === "undefined") {
      toast.error("Razorpay SDK not loaded. Please try again later.");
      return;
    }
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent form default submission


    try {
      let orderItems = []; // Initialize an array to store order items
      console.log("cartItems", CartItems);
      console.log("products", products);

      console.log('Token being sent:', token);

      // Iterate over cart items
      for (const items in CartItems) {
        for (const item in CartItems[items]) {
          if (CartItems[items][item] > 0) {

            const itemsInfo = structuredClone(products.find(product => product._id === items))
            if (itemsInfo) {
              itemsInfo.size = item
              itemsInfo.quantity = CartItems[items][item]
              orderItems.push(itemsInfo);
            }
          }

        }
      }
      console.log(orderItems);

      // Build order data
      const orderData = {
        address: formData, // Make sure `formData` contains valid address info
        item: orderItems,
        amount: getCartAmount() + delivery_fee, // Ensure getCartAmount() is correct
      };

      // Switch case for payment method
      switch (method) {
        case 'cod': // Cash on Delivery
          try {
            const response = await axios.post(`${backendUrl}/api/order/place`,orderData, {
              headers: {
                token, // Assuming token is correct
              },
            });

            console.log(response.data);

            if (response.data.success) {
              setCartItems({}); // Clear the cart
              navigate('/order'); // Redirect to order page
            } else {
              toast.error(response.data.message); // Display error message
            }
          } catch (error) {
            console.error("An error occurred while placing the order:", error);
            toast.error("Something went wrong while placing the order.");
          }
          break;

        case 'stripe':
          try {
            const responseStripe = await axios.post(`${backendUrl}/api/order/place/stripe`,orderData, {
              headers: {
                token, // Assuming token is correct
              },
              
            });

       
            if(!responseStripe){
              console.log("Something went wrong while placing the order.");
            }



            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url); // Redirect to Stripe checkout session
              navigate('/order');
            setCartItems({}); 
            } else {
              toast.error(responseStripe.data.message); // Display error message from Stripe response
            }

           
          } catch (error) {
            console.error('Error processing Stripe payment:', error);
            toast.error('An error occurred during payment. Please try again.'); // Generic error message
          }

          break;

          case 'razorpay':
            try {
              // Make API request to place the order via Razorpay
              const responseRazorpay = await axios.post(
                `${backendUrl}/api/order/place/razorpay`,
                orderData,
                {
                  headers: {
                    token: token, // Ensure token is available
                  },
                }
              );
          
              // Check if the response was successful and contains the necessary order details
              if (responseRazorpay.data.success && responseRazorpay.data.order) {
                initPay(responseRazorpay.data.order); // Proceed to payment
              } else {
                toast.error("Failed to create Razorpay order. Please try again.");
              }
            } catch (error) {
              console.error("Error placing Razorpay order:", error);
              toast.error(error.response?.data?.message || "Something went wrong with the payment process.");
            }
            break;
          

        default:
         
        

          break;
      }



    } catch (error) {
      console.error("An error occurred while processing cart items:", error);
      toast.error("Error processing cart items.");
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh]">
      {/** Left side */}
      <div className="flex flex-col w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            placeholder="First name"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded mt-2 py-1.5 px-3.5 w-full outline-none"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded my-2 py-1.5 px-3.5 w-full outline-none"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            placeholder="City"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            placeholder="State"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <div className="flex mt-2 gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            placeholder="Pin code"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
            inputMode="numeric"
            pattern="\d*"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          placeholder="Mobile Number"
          className="border border-gray-300 outline-none mt-2 rounded py-1.5 px-3.5 w-full"
          type="text"
          inputMode="numeric"
          pattern="\d*"
        />
      </div>

      {/** Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment method selection */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div onClick={() => setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`} />
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} />
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black px-16 py-3 text-white">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Place;
