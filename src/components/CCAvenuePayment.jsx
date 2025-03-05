import React, { useState } from 'react';
import axios from 'axios';

const CCAvenuePayment = () => {
    const [orderId, setOrderId] = useState('');
    const [amount, setAmount] = useState('');

    const generateOrderId = () => {
        return 'Order_' + Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random order ID
    };

    const handlePayment = async () => {
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);

        try {
            const response = await axios.post('https://api.weddingsoulmates.com/getEncryptedData', {
                merchant_id: '4125332',
                order_id: newOrderId,
                amount: amount,
                currency: 'INR',
                redirect_url: 'https://weddingsoulmates.com/payment-response',
                cancel_url: 'https://weddingsoulmates.com/payment-cancel'
            });

            const encryptedData = response.data.encryptedData;
            window.location.href = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encryptedData}&access_code=AYKF55MB77B543FK5B`;
        } catch (error) {
            console.error('Error during payment process:', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default CCAvenuePayment;