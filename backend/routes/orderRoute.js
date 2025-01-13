import express from 'express'

import {verifyStrip ,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrders,updateStatus, verifyRazorpay}  from '../controllesrs/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter =express.Router();


orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)



orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/place/stripe', authUser,placeOrderStripe)
orderRouter.post('/place/razorpay',authUser,placeOrderRazorpay)


orderRouter.post('/userorders',authUser,userOrders)

orderRouter.post('/verifyStripe',authUser,verifyStrip )
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter

