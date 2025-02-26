import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Payment Canceled</h1>
            <p>Your payment was canceled. If this was a mistake, you can try again.</p>
            <button onClick={() => navigate('/pricing')}>Return to Pricing</button>
        </div>
    );
};

export default PaymentCancel;