import React from 'react';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CashfreePayment = ({ planId, planPrice }) => {
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    console.log(planId, 'planId');
    console.log(planPrice, 'planPrice');
    const { user } = useAuth();
    const user_id = user?.id ? user.id : 0;

    const handlePayment = async () => {
        let cashfree;
        setLoading(true); // Set loading to true when payment process starts
        setError(null); // Reset any previous errors

        try {
            // Step 1: Create order on your backend
            const orderResponse = await axios.post('http://localhost:4000/create-order', {
                user_id: user_id, // Replace with actual user ID
                plan_id: planId, // Replace with actual plan ID
                amount: planPrice, // Amount in INR
                currency: 'INR'
            });

            console.log(orderResponse.data, 'Backend Response');

            // Step 2: Initialize Cashfree Checkout
            const { paymentSessionId, orderId } = orderResponse.data;
            cashfree = await load({
                mode: "sandbox", // Use "sandbox" for testing
            });

            // Step 3: Render the Cashfree payment UI
            cashfree.checkout({
                paymentSessionId,
                redirectTarget: "_self", // or "_self"
                returnUrl: `http://localhost:3000/PaymentStatus?order_id=${orderId}`,
            }).then(async (result) => {
                // Payment was successful
                console.log('Payment successful');
            }).catch(async (error) => {
                // Payment failed
                console.error('Payment failed:', error);
                setError('Payment failed. Please try again.'); // Set error message
            });

        } catch (error) {
            console.error('Payment process encountered an error:', error);
            setError('Payment failed. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Set loading to false when the process ends
        }
    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading} className='btn btn-primary btn-sm'>
                {loading ? 'Processing...' : 'BUY NOW'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
        </div>
    );
};

export default CashfreePayment;