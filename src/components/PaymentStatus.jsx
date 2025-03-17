import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Toast } from "primereact/toast";
import { useToast } from '../../src/assets/utils/toastUtil';
import { useAuth } from '../../src/context/AuthContext';
const PaymentStatus = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast, showToast } = useToast();
    const { user, setUser } = useAuth();
    const [isPlanActive, setIsPlanActive] = useState(false);
    useEffect(() => {
        const checkPaymentStatus = async () => {
            const searchParams = new URLSearchParams(location.search);
            const orderId = searchParams.get('orderId'); // Capture orderId from the URL
            const token = localStorage.getItem('authToken');

            const payload = {
                token,
                orderId: orderId,
            };

            try {
                const response = await axios.post('http://localhost:4000/api/payment-status', payload);

                // Destructure the response data
                const { status, amount, paymentMode, transactionId, timestamp, message, user } = response.data;

                // Check payment status
                if (status === 'COMPLETED') {
                    // Update the user object
                    const updatedUser = {
                        ...user, // Use the user object from the response
                        premium_user: 1,
                        active_plan: {
                            ...user.active_plan, // Use the active_plan from the user object
                            status: 'Approved'
                        }
                    };

                    // Update state and localStorage
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    // Show success message
                    showToast('Payment approved! Your plan is now active.', 'success');
                    setIsPlanActive(true);
                } else {
                    // Show error message if payment is not completed
                    showToast('Payment failed or is still pending.', 'error');
                }

                // Update the state with the payment status data
                setPaymentStatus({
                    status,
                    amount,
                    paymentMode,
                    transactionId,
                    timestamp,
                    message
                });
            } catch (error) {
                console.error('Error checking payment status:', error);
                showToast('Error checking payment status.', 'error');
            } finally {
                setLoading(false);
            }
        };

        checkPaymentStatus();
    }, [location.search]);

    return (
        <>
            <section>
                <Toast ref={toast} />
                <div className='login pg-cont'>
                    <div class="container"><div class="row"><div class="fot-ban-inn">

                        <h1 className='text-center'>Payment Status</h1>
                        {loading ? (
                            <p>Checking payment status...</p>
                        ) : paymentStatus ? (
                            <div>
                                <p>Status: {paymentStatus.status}</p>
                                <p>Amount: {paymentStatus.amount / 100} INR</p> {/* Convert from paise to INR */}
                                <p>Payment Mode: {paymentStatus.paymentMode}</p>
                                <p>Transaction ID: {paymentStatus.transactionId}</p>
                                <p>Timestamp: {new Date(paymentStatus.timestamp).toLocaleString()}</p>
                                <p>Message: {paymentStatus.message}
                                    {paymentStatus.status === 'FAILED' && (
                                        <a href='/pricing' className='btn btn-primary' style={{ margin: '8px' }}>
                                            Retry Payment
                                        </a>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <p>No status available.</p>
                        )}
                    </div>
                    </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default PaymentStatus;
