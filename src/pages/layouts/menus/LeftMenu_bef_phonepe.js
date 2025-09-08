import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Toast } from "primereact/toast";
import { useToast } from '../../../assets/utils/toastUtil';
import config from "../../../config";
import { useAuth } from '../../../context/AuthContext';
import PaymentPage from "../../../components/PaymentPage";

const LeftMenu = () => {
    const planId = useSelector((state) => state.pricing.selectedPlanId);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [upiId] = useState('9789253515@upi');
    const { toast, showToast } = useToast();
    const [isPlanActive, setIsPlanActive] = useState(false);
    const { user, setUser } = useAuth();

    const plans = {
        1: { name: "Silver", price: "1499", validity: "1 month" },
        2: { name: "Gold", price: "4999", validity: "6 months" },
        3: { name: "Platinum", price: "9999", validity: "12 months" }
    };

    const generateOrderId = () => {
        return 'Order_' + Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random order ID
    };

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'setUserPlan';
    } else {
        console.error('Invalid API url');
    }

    const selectedPlan = plans[planId];
    const planPrice = selectedPlan?.price;

    useEffect(() => {
        const checkActivePlan = () => {
            const activePlan = user?.active_plan; // Access the active_plan object directly

            if (activePlan) {
                const expiryDate = new Date(activePlan.expiry_date); // Convert expiry_date to a Date object
                const currentDate = new Date(); // Get the current date

                if (expiryDate > currentDate) {
                    setIsPlanActive(true); // Plan is active
                } else {
                    setIsPlanActive(false); // Plan is expired
                }
            } else {
                setIsPlanActive(false); // No active plan
            }
        };

        checkActivePlan();
    }, [user?.active_plan]); // Dependency on user.active_plan

    useEffect(() => {
        if (!isPlanActive) {
            // Dynamically generate order ID
            const orderId = generateOrderId();
            setOrderId(orderId);
            // Generate UPI link with planPrice and orderId
            const upiLink = `upi://pay?pa=${upiId}&pn=YoungZenTechnologies&tn=PaymentForOrder_${orderId}&am=${planPrice}&cu=INR`;

            // Generate the QR Code and set it to the state
            QRCode.toDataURL(upiLink, (err, url) => {
                if (err) {
                    console.error('Error generating QR Code:', err);
                } else {
                    setQrCodeUrl(url); // Set the generated QR code URL
                }
            });
        }
    }, [planPrice, upiId, isPlanActive]);

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const token = localStorage.getItem('authToken');
        const payload = {
            token,
            transaction_id: transactionId, // Assuming you have this in your formData
            order_id: orderId,
            plan_price: planPrice,
        };
        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Send the full form data as JSON
            });

            const data = await response.json();


            // Start polling to check if the payment is approved
            const intervalId = setInterval(async () => {
                try {
                    const planResponse = await fetch(`${apiUrl}getPlanDetails`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                    });

                    const planData = await planResponse.json();

                    if (planData.plan.status === 'Approved') {
                        clearInterval(intervalId);
                        const updatedUser = {
                            ...data.user,
                            premium_user: 1,
                            active_plan: {
                                ...data.user.active_plan,
                                status: 'Approved'
                            }
                        };
                        setUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        showToast('Payment approved! Your plan is now active.', 'success');
                        setIsPlanActive(true);
                    } else if (planData.plan.status === 'Rejected') {
                        clearInterval(intervalId);
                    }
                } catch (error) {
                    console.error('Error fetching plan details:', error);
                }
            }, 30000); // Poll every 5 seconds

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        } catch (error) {
            showToast('Something went wrong, please try again.', 'error');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(upiId);
        showToast('UPI ID copied to clipboard');
    };

    return (
        <div className="menu-pop menu-pop1">
            <Toast ref={toast} />
            <span className="menu-pop-clo"><i className="fa fa-times" aria-hidden="true"></i></span>
            <div className="inn">
                <p><strong>PooluvaGounder Matrimony </strong> is rapidly becoming one of the leading Tamil matchmaking services.</p>

                {/* Display selected plan details */}
                {selectedPlan ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center">
                        <span className="mb-8" style={{ color: 'black' }}> Plan Details </span>
                        <h3 className="text-xl font-bold mb-2"> {selectedPlan.name} Plan</h3>
                        <p className="text-gray-700 mb-1"><strong style={{ color: 'black' }}>Price:</strong> &#8377;{selectedPlan.price}</p>
                        <p className="text-gray-700 mb-1"><strong style={{ color: 'black' }}> Validity:</strong> {selectedPlan.validity}</p>
                        {/* Show Current Plan Badge if Plan is Active */}
                        {isPlanActive && (
                            <div className="mt-3">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                    Current Plan
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-600 mb-4">No plan selected.</p>
                )}

                {isPlanActive ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center">
                        <p className="text-gray-700 mb-1"><strong style={{ color: 'black' }}>You already have an active plan.</strong></p>
                    </div>
                ) : (
                    <div className="menu-pop-help">
                        <div className="user-bio1">
                            <h4>Step 1: Make Payment</h4>
                            <p style={{ color: 'black' }}>Please scan the QR code below or copy the UPI ID to make the payment using any UPI method such as <span style={{ color: 'crimson' }}>GPay, PhonePe, Paytm,</span> etc.</p>

                            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                {qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="UPI Payment QR Code" style={{ margin: '0 auto' }} />
                                ) : (
                                    <p>Generating QR Code...</p>
                                )}
                            </div>

                            <p style={{ textAlign: 'center' }}><strong>Or copy UPI ID:</strong></p>
                            <div className="copy-upi-id" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                <span style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>{upiId}</span>
                                <button onClick={copyToClipboard} className="btn btn-secondary btn-sm">Copy UPI ID</button>
                            </div>

                            <p style={{ color: 'black' }}> <strong>Note:</strong> Once you make the payment, you'll need to enter your UPI transaction ID below for verification.</p>

                            {/* Step 2: Transaction ID Form */}
                            <h4>Step 2: Enter Transaction ID</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="transactionId">UPI Transaction ID:</label>
                                    <input
                                        type="text"
                                        id="transactionId"
                                        value={transactionId}
                                        onChange={handleTransactionIdChange}
                                        required
                                        className="form-control"
                                        placeholder="Enter UPI Transaction ID"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm" disabled={submitted} >Submit Transaction ID</button>
                            </form>

                            {/* Confirmation Message */}
                            {submitted && (
                                <p className="text-black mt-4">
                                    Thank you! <br /> Your payment is being processed. It will be manually <span style={{ textAlign: 'center' }} >approved within the next 1-10 minutes.</span>  Your payment is secure and guaranteed.
                                </p>
                            )}
                        </div>
                        <PaymentPage />
                    </div>
                )}

                {/* Social Media Links */}
                <div className="menu-pop-soci">
                    <ul>
                        <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;