import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentResponse = () => {
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const encResponse = queryParams.get('encResponse');

        axios.post('https://api.pooluvagounder.com/decryptResponse', { encResponse })
            .then(response => {
            });
    }, []);

    return (
        <div>
            <h1>Payment Response</h1>
        </div>
    );
};

export default PaymentResponse;