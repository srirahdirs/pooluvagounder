import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [orderId, setOrderId] = useState(`ORD${Math.floor(Math.random() * 100000)}`);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handlePayment = async () => {
        try {
            const response = await axios.post('https://api.weddingsoulmates.com/getPaymentData', {
                merchant_id: '4125332',
                order_id: `ORD${Math.floor(Math.random() * 100000)}`,
                currency: 'INR',
                amount: '10.00',
                redirect_url: 'https://weddingsoulmates.com/payment-response',
                cancel_url: 'https://weddingsoulmates.com/payment-cancel',
                language: 'EN'
            });

            const { encryptedData, access_code } = response.data;

            // Submit the form to CCAvenue
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

            const encryptedDataInput = document.createElement('input');
            encryptedDataInput.type = 'hidden';
            encryptedDataInput.name = 'encRequest';
            encryptedDataInput.value = encryptedData;
            form.appendChild(encryptedDataInput);

            const accessCodeInput = document.createElement('input');
            accessCodeInput.type = 'hidden';
            accessCodeInput.name = 'access_code';
            accessCodeInput.value = access_code;
            form.appendChild(accessCodeInput);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h1>CCAvenue Payment Integration</h1>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default App; 