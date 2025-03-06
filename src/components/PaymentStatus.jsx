import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [paymentStatus, setPaymentStatus] = useState(null); // State to hold payment status
    const [error, setError] = useState(null); // State to hold any error
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (!orderId) {
                setError('Order ID is missing.');
                return;
            }

            const response = await axios.get(`https://api.weddingsoulmates.com/paymentstatus?order_id=${orderId}`);
            if (response?.data?.message === 'PAID') {
                setPaymentStatus(response?.data?.message);
            } else {
                setError('Payment Failed. Please Try Again!',);
            }
            setTimeout(() => {
                navigate('/home');
            }, 5000);
        };

        fetchPaymentStatus();
    }, [orderId]);

    return (
        <div>
            <h1 style={{ marginTop: '150px' }}>Processing payment status...</h1>
            {error ? (
                <h5 style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</h5>
            ) : (
                <h5 style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>{paymentStatus}</h5>
            )}
        </div>
    );
};

export default PaymentStatus;
