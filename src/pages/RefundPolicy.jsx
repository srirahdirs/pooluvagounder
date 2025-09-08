import React from 'react';
import '../assets/css/RefundPolicy.css';
import config from '../config';
import SEO from '../components/SEO'; // Adjust the import path based on where the SEO component is located

const RefundPolicy = () => {
    const supportEmail = config?.supportEmail;

    // Schema for refund policy
    const refundPolicySchema = {
        "@context": "https://schema.org",
        "@type": "RefundPolicy",
        "name": "PooluvaGounder Matrimony Refund Policy",
        "description": "Review the refund policy for PooluvaGounder Matrimony. We do not offer refunds on any subscription or service purchased.",
        "publisher": {
            "@type": "Organization",
            "name": "PooluvaGounder Matrimony",
            "url": "https://pooluvagounder.com/",
        },
        "termsOfService": "https://pooluvagounder.com//terms-of-service"
    };

    return (
        <div className="privacy-container mb-5">
            {/* Adding SEO component with Schema */}
            <SEO
                title="Refund Policy - PooluvaGounder Matrimony"
                description="Review the refund policy for PooluvaGounder Matrimony. Please note that we do not offer any refunds on subscription services."
                schema={refundPolicySchema} // Passing the schema to SEO component
            />

            <main className="content">
                <div className="container">
                    <h2>Refund Policy</h2>
                    <p>Thank you for choosing PooluvaGounder Matrimony. Please carefully review our refund policy outlined below. By using our services, you agree to the terms specified here.</p>

                    <h3>1. No Refunds</h3>
                    <p>As our services involve access to premium features, once a subscription or service is purchased, it is considered final. We do not offer any refunds under any circumstances.</p>

                    {/* <h3>2. Cancellation of Subscription</h3>
                    <p>If you choose to cancel your subscription, it will be valid until the end of the billing cycle. No partial refunds will be provided.</p> */}

                    <h3>2. Exceptional Circumstances</h3>
                    <p>In rare cases of technical failures or errors that prevent you from using the platform, please reach out to our support team. We will work to resolve the issue or provide alternate solutions. However, refunds will not be issued in these cases.</p>

                    <h3>3. Contact Us</h3>
                    <p>If you have any questions or need assistance, feel free to contact us:</p>
                    <ul>
                        <li>Email: <a href={`mailto:${supportEmail}`}><strong>{supportEmail}</strong></a></li>
                        <li>Phone: <a href="tel:+91-4223568392"><strong>+91-4223568392</strong></a></li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default RefundPolicy;
