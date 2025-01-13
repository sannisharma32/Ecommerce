//placing order using COD  method

import orderModel from '../models/ordermodel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import razorpay from "razorpay"


//golobal variable;
const currency = 'inr'
const deliveryCharge = 10;






const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY


})





//GETway intalize



const placeOrder = async (req, res) => {
  try {
    const { userId, item, amount, address } = req.body;
    console.log(req.body)



    // Validate required fields
    if (!userId || !item || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (userId, item, amount, address)',
      });
    }

    // Create the order data
    const orderData = {
      userId,
      item,
      address,
      amount,
      status: 'order place',
      PaymentMethod: 'COD', // Fixed capitalization to match schema
      payment: false,
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { CartData: {} });

    // Respond with success
    res.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error in placeOrder:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while placing the order.',
    });
  }
};

export default placeOrder;

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, item, amount, address } = req.body;
    const { origin } = req.headers;

    // Fallback for missing origin header
    if (!origin) {
      return res.status(400).json({ success: false, message: 'Origin header missing' });
    }

    // Define currency and delivery charge
    const currency = 'inr'; // Example, adjust as needed
    const deliveryCharge = 10; // Example, adjust as needed

    const orderData = {
      userId,
      item,
      address,
      amount,
      status: 'order placed',
      PaymentMethod: 'stripe',
      payment: false,
      date: Date.now(),
    };

    // Save order to database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { CartData: {} });

    // Validate items and prepare line_items
    const line_items = item.map((item) => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error('Missing item properties');
      }
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Add delivery charge to line_items
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100, // Convert to cents
      },
      quantity: 1,
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order or Stripe session',
      error: error.message,
      stack: error.stack, // Add stack trace for better debugging
    });
  }
};


//verifiy strip

const verifyStrip = async (req, res) => {
  const { userId, orderId, success } = req.body;

  try {
    // Validate inputs
    if (!orderId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId or userId',
      });
    }

    // Process payment success
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { CartData: [] });

      return res.status(200).json({
        success: true,
        message: 'Payment verified and cart cleared',
      });
    }

    // Handle payment failure
    await orderModel.findByIdAndDelete(orderId);
    return res.status(200).json({
      success: false,
      message: 'Payment failed, order deleted',
    });

  } catch (error) {
    console.error('Error verifying Stripe session:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};




const placeOrderRazorpay = async (req, res) => {

  try {
    const { userId, item, amount, address } = req.body;


    // Fallback for missing origin header
    
    // Define currency and delivery charge
    const currency = 'inr'; // Example, adjust as needed
    const deliveryCharge = 10; // Example, adjust as needed

    const orderData = {
      userId,
      item,
      address,
      amount,
      PaymentMethod: 'Razorpay',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()

    }
    await razorpayInstance.orders.create(options, (error,order) => {

      if(error){
        console.log(error);
        return res.json({success:false,message:error})

        
      }
      res.json({success:true,order})
    })

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error})

  }



}

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    // Validate required fields
    if (!userId || !razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Fetch order info from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Check if the payment is successful
    if (orderInfo.status === 'paid') {
      // Update the order in the database
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });

      // Clear the user's cart
      await userModel.findByIdAndUpdate(userId, { CartData: {} });

      return res.json({ success: true, message: "Payment successful" });
    } else {
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    if (orders.length === 0) {
      // Handle case when no orders are found
      return res.json({ success: true, message: 'No orders found', orders: [] });
    }

    res.json({ success: true, orders }); // Successful response
  } catch (error) {
    console.error('Error fetching orders:', error); // Log error to the server console
    res.status(500).json({ success: false, message: 'Internal Server Error' }); // Send a generic error message to the client
  }
};


const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });

  } catch (error) {
    console.error('Error in userOrders:', error);
    res.json({ success: false, message: error.message })

  }
}



const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'status update' });

  } catch (error) {
    console.log('Error in updateStatus:', error);
    res.json({ success: false, message: error.message })

  }

}


export {verifyRazorpay, verifyStrip , placeOrder, placeOrderStripe, placeOrderRazorpay, allOrder, userOrders, updateStatus }

