import React, { useState } from 'react';
import axios from 'axios';

const CCAvenuePayment = (amount) => {
    const [orderId, setOrderId] = useState(`ORD${Math.floor(Math.random() * 100000)}`);

    const handlePayment = async () => {
        // Send payment request to backend to get encrypted data and access code
        const res = await axios.post('http://localhost:4000/payment', { orderId, amount });
        console.log(res, 'ress');

        // Open CCAvenue payment page using a form
        const { encryptedData, accessCode } = res.data;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
        form.target = '_self';

        // Append required fields
        const accessCodeInput = document.createElement('input');
        accessCodeInput.name = 'access_code';
        accessCodeInput.value = accessCode;
        form.appendChild(accessCodeInput);

        const encRequestInput = document.createElement('input');
        encRequestInput.name = 'encRequest';
        encRequestInput.value = encryptedData;
        form.appendChild(encRequestInput);

        const merchantIdInput = document.createElement('input');
        merchantIdInput.name = 'merchant_id';
        merchantIdInput.value = '4125332';
        form.appendChild(merchantIdInput);

        // Append form to body and submit
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div>
            <h2>Pay with CCAvenue</h2>
            <input
                type="text"
                value={amount}
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default CCAvenuePayment;
