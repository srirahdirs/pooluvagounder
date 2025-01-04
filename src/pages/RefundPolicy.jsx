import React from 'react';
import '../assets/css/RefundPolicy.css';

const RefundPolicy = () => {
    return (
        <div className="refund-policy">
            <main className="content">
                <div className="container">
                    <h2>Refund Policy</h2>
                    <p>Thank you for choosing WeddingSoulMates. Please carefully review our refund policy outlined below. By using our services, you agree to the terms specified here.</p>

                    <h3>1. No Refunds</h3>
                    <p>As our services involve access to premium features, once a subscription or service is purchased, it is considered final. We do not offer any refunds under any circumstances.</p>

                    <h3>2. Cancellation of Subscription</h3>
                    <p>If you choose to cancel your subscription, it will be valid until the end of the billing cycle. No partial refunds will be provided.</p>

                    <h3>3. Exceptional Circumstances</h3>
                    <p>In rare cases of technical failures or errors that prevent you from using the platform, please reach out to our support team. We will work to resolve the issue or provide alternate solutions. However, refunds will not be issued in these cases.</p>

                    <h3>4. Contact Us</h3>
                    <p>If you have any questions or need assistance, feel free to contact us:</p>
                    <ul>
                        <li>Email: <strong>support@weddingsoulmates.com</strong></li>
                        <li>Phone: <strong>+91-4223568392</strong></li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default RefundPolicy;
