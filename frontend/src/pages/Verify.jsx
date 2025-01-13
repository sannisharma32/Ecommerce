import React, { useContext, useEffect } from 'react';
import { Shopcontext } from "../context/ShopContext.jsx";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(Shopcontext);
    const [searchParam] = useSearchParams();
    const success = searchParam.get('success');
    const orderId = searchParam.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,{success,orderId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    
                }
            );

            console.log(response.data)
            if (response.data.success) {
                setCartItems({});
                navigate('/order');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Payment verification failed');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]); // Ensure `verifyPayment` is stable or memoized if `token` changes often

    return (
        <div>
            <p>Verifying your payment... Please wait.</p>
        </div>
    );
};

export default Verify;
