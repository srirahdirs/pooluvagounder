import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../src/context/AuthContext';
import { Toast } from "primereact/toast";
import { useToast } from '../../src/assets/utils/toastUtil';

const PaymentPage = ({ price = 0 }) => {
    const { user, setUser } = useAuth();
    const [paymentData, setPaymentData] = useState({
        transactionId: uuidv4(),
        amount: price ?? 0,  // Set the amount from the passed price prop
        merchantOrderId: uuidv4(),
        merchantUserId: user?.id,
    });


    const { toast, showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const CALLBACK_URL = 'https://api.pooluvagounder.com/api/payment-status'; // Reusable callback URL

    useEffect(() => {
        setPaymentData((prevData) => ({
            ...prevData,
            amount: price // Update amount when price changes
        }));
    }, [price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const handlePayment = async () => {
        const { amount, merchantOrderId, merchantUserId } = paymentData;

        if (!amount || !merchantOrderId || !merchantUserId) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://api.pooluvagounder.com/api/payment/initiate', {
                amount: parseInt(amount), // Send the amount in INR, it will be converted in the backend
                orderId: merchantOrderId,
                customerId: merchantUserId,
                callbackUrl: CALLBACK_URL,
                user_id: user?.id,
            });

            console.log('Payment Initiated:', response.data);

            // Use the redirectUrl from the response to redirect the user to the payment gateway
            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            } else {
                showToast('No redirect URL found in the response', 'error');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            showToast('Error initiating payment. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <input
                type="hidden"
                name="amount"
                placeholder="Amount (INR)"
                value={paymentData.amount}
                onChange={handleChange}
                required
            />

            <input
                type="hidden"
                name="merchantOrderId"
                placeholder="Merchant Order ID"
                value={paymentData.merchantOrderId}
                onChange={handleChange}
                readOnly
            />

            <input
                type="hidden"
                name="merchantUserId"
                placeholder="Merchant User ID"
                value={paymentData.merchantUserId}
                onChange={handleChange}
            />
            <div className='text-center'>
                <button onClick={handlePayment} disabled={loading} className='btn btn-primary btn-sm'>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
