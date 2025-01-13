import React from 'react'

import { useEffect } from 'react'

import { useState } from 'react'

import axios from 'axios'

import { backendUrl, currency } from '../src/App'

import { toast } from 'react-toastify'

import { assets } from '../src/assets/assets'





const Order = ({ token }) => {

    const [orders, setOrders] = useState([])





    const fetchAllorders = async () => {

        console.log('Token:', token);

        if (!token) {

            toast.error('Authentication token is missing.');

            return;

        }



        try {



            const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { Authorization: `Bearer ${token}` } })

            if (response.data) {

                console.log(response.data)

                setOrders(response.data.orders.reverse())

            } else {

                console.log("No orders found")

                toast.error(response.data.message)



            }



        } catch (error) {

            console.log(error)







        }



    }



    const statusHandler = async (event, orderId) => {

        console.log('Token:', token);

        try {

            const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value }, {
                headers: {

                    Authorization: `Bearer ${token}`

                }
            })

            if (response.data.success) {

                console.log(response.data);

                await fetchAllorders();

            }



        } catch (error) {

            console.log(error)

            toast.error(response.data.message)



        }



    }



    useEffect(() => {

        fetchAllorders();



    }, [token])



    return (

        <div>

            <h3>Order Page</h3>

            <div className="">

                {orders.map((order, index) => (

                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">

                        <img className='w-12' src={assets.parcel_icon} alt="" />

                        <div>

                            <div className="">

                                {order.item.map((item, index) => {

                                    if (index === order.item.length - 1) {

                                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>;

                                    } else {

                                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item

                                            .size},</span></p>;

                                    }

                                    // return null; // Add a return statement to handle non-last items

                                })}

                            </div>

                            <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>

                            <div className="">

                                <p>{order.address.street + ","}</p>

                                <p>{order.address.city + " ," + order.address.state + ", " + order.address.country + " ," + order.address.zipcode}</p>

                            </div>

                            <p>{order.address.phone}</p>

                        </div>



                        <div>

                            <p className='text-sm sm:text-[15px]'>Item:{order.item.length}</p>



                            <p className='mt-3'>Method:{order.PaymentMethod}</p>

                            <p> Payment :{order.payment ? "Done" : 'pending'}</p>



                            <p className='text-sm sm:text-[15px]'>Date{new Date(order.Date).toLocaleDateString()}</p>

                        </div>

                        <p>{currency} {order.amount}</p>

                        <select onChange={(e) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold' >



                            <option value="Order Place">Order Place</option>

                            <option value="Packing">Packing</option>

                            <option value="Shipped">Shipped</option>

                            <option value="Out for delivery">Out for delivery</option>

                            <option value="Delivered">Delivered</option>

                        </select>

                    </div>



                ))}

            </div>

        </div>

    );



}



export default Order
