import React from 'react';
import '../assets/css/PrivacyPolicy.css'; // Import the CSS file for styling
import config from '../config';

const PrivacyPolicy = () => {
    const supportEmail = config.supportEmail;
    return (
        <div className="privacy-container mb-5">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> December 2024</p>
            <div className="privacy-content">
                <p>At <strong>WeddingSoulMates.com</strong>, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit and use our website. By using our website, you consent to the practices described in this policy.</p>

                <h2 className='text-start'>1. Information We Collect</h2>
                <p>We collect various types of personal information to provide you with a safe and customized experience. The types of information we collect include:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, gender, age, height, weight, marital status, job type, income details, mother tongue, religion, caste, sub-caste, gothram, dosham, star, raasi, physical status, food preferences, alcohol consumption, and smoking preferences.</li>
                    <li><strong>Contact Information:</strong> Email address, phone number, and residential address.</li>
                    <li><strong>Profile Information:</strong> Details about your preferences and partner criteria (age, height, caste, job, etc.).</li>
                    <li><strong>Location Information:</strong> We may collect your location data to match you with relevant profiles.</li>
                    <li><strong>Payment Information:</strong> If applicable, when subscribing to premium services, we may collect payment details. We do not store sensitive payment data. All payments are securely processed by third-party payment providers, and the PAN holder for any applicable financial transactions on this platform is <strong>Sridhar Vellingiri</strong>.</li>
                    <li><strong>Other Information:</strong> Any data you provide through messaging, comments, and interactions on the platform.</li>
                </ul>

                <h2 className='text-start'>2. How We Use Your Information</h2>
                <p>The information collected is used for the following purposes:</p>
                <ul>
                    <li>To create and manage your profile.</li>
                    <li>To connect you with potential matches based on your preferences.</li>
                    <li>To improve user experience and personalize your interactions with the site.</li>
                    <li>To communicate with you about site updates, promotions, and service-related announcements.</li>
                    <li>To process transactions (if applicable).</li>
                    <li>To enforce our terms and prevent fraudulent or unauthorized activity.</li>
                </ul>

                <h2 className='text-start'>3. Sharing of Information</h2>
                <p>We do not share your personal information with third parties except in the following situations:</p>
                <ul>
                    <li><strong>With Consent:</strong> When you explicitly agree to share your information with another user or third party.</li>
                    <li><strong>Service Providers:</strong> We may share information with trusted service providers to help us operate our website, such as payment processors or customer support teams.</li>
                    <li><strong>Legal Obligations:</strong> If required by law, we may disclose your information to comply with legal processes, investigations, or to protect our rights and the safety of others.</li>
                </ul>

                <h2 className='text-start'>4. Data Security</h2>
                <p>We implement robust security measures to protect your personal information. However, no online service can be completely secure. We encourage you to safeguard your login credentials and report any suspicious activity to us immediately.</p>

                <h2 className='text-start'>5. User Controls</h2>
                <p>You have control over your personal information:</p>
                <ul>
                    <li><strong>Editing Profile:</strong> You can review and update your profile details at any time.</li>
                    <li><strong>Deleting Account:</strong> You may request account deletion by contacting our support team, and we will process your request as soon as possible.</li>
                    <li><strong>Email/Notification Preferences:</strong> You can manage your notification preferences in your account settings.</li>
                </ul>

                <h2 className='text-start'>6. Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.</p>

                <h2 className='text-start'>7. Children's Privacy</h2>
                <p>Our website is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.</p>

                <h2 className='text-start'>8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we make changes, we will notify you by updating the "Effective Date" at the top of this page.</p>

                <h2 className='text-start'>9. Contact Us</h2>
                <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>

                <div className="contact-info">
                    <p><strong>Email:</strong><a href={`mailto:${supportEmail}`}> {supportEmail}</a></p>
                    <p><strong>Address:</strong> YoungZen Technologies, No 8a, 8th Cross, Sultanpalya Main Road, RT Nagar, Bangalore 560032, Karnataka, India.</p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
