import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentResponse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Extract the encrypted response from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const encResp = queryParams.get('encResp');

        if (!encResp) {
            setError('No payment response received.');
            return;
        }

        // Send the encrypted response to the backend for decryption and processing
        const processPaymentResponse = async () => {
            try {
                const response = await axios.post('https://api.weddingsoulmates.com/processPaymentResponse', {
                    encResp: encResp
                });

                // Set the payment status based on the decrypted response
                setPaymentStatus(response.data);
            } catch (error) {
                console.error('Error processing payment response:', error);
                setError('Failed to process payment response. Please try again.');
            }
        };

        processPaymentResponse();
    }, [location]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Payment Response</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : paymentStatus ? (
                <div>
                    <p><strong>Order ID:</strong> {paymentStatus.order_id}</p>
                    <p><strong>Amount:</strong> {paymentStatus.amount}</p>
                    <p><strong>Status:</strong> {paymentStatus.order_status}</p>
                    {paymentStatus.order_status === 'Success' ? (
                        <p style={{ color: 'green' }}>Your payment was successful!</p>
                    ) : (
                        <p style={{ color: 'red' }}>Your payment failed or was canceled.</p>
                    )}
                    <button onClick={() => navigate('/')}>Return to Home</button>
                </div>
            ) : (
                <p>Processing payment response...</p>
            )}
        </div>
    );
};

export default PaymentResponse;