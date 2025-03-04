import React, { useState } from 'react';
import axios from 'axios';
import config from '../../src/config';

const CCAvenuePayment = () => {
    const [amount, setAmount] = useState('');
    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'getEncryptedData';
    } else {
        console.error('Invalid API url');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        try {
            // Generate a random order ID
            const randomOrderId = Math.random().toString(36).substring(2, 15); // Random alphanumeric string
            console.log('Generated Order ID:', randomOrderId);

            // Make a POST request to the backend to get encrypted data
            const response = await axios.post(fullApiUrl, {
                amount: amount,
                order_id: randomOrderId,
                currency: 'INR',
                redirect_url: 'https://api.weddingsoulmates.com/ccavenue-response', // Use ngrok URL
                cancel_url: 'https://api.weddingsoulmates.com/cancel', // Use ngrok URL
            });

            const { encryptedData } = response.data;

            // Create a form dynamically and submit it to CCAvenue
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

            const encryptedInput = document.createElement('input');
            encryptedInput.type = 'hidden';
            encryptedInput.name = 'encRequest';
            encryptedInput.value = encryptedData;

            const accessCodeInput = document.createElement('input');
            accessCodeInput.type = 'hidden';
            accessCodeInput.name = 'access_code';
            accessCodeInput.value = 'AVKF55MB77BS43FKSB'; // Replace with your access code

            form.appendChild(encryptedInput);
            form.appendChild(accessCodeInput);
            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Error during payment processing:', error);
            alert('An error occurred while processing your payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default CCAvenuePayment;