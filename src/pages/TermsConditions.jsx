import React from 'react';
import '../assets/css/PrivacyPolicy.css'; // Import the CSS file for styling
import config from '../config'; // Import the config file to access the support email
import SEO from '../components/SEO';

const TermsAndConditions = () => {
    const supportEmail = config?.supportEmail;
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pooluvagounder.com' : 'http://localhost:3000';

    // Structured data for Terms and Conditions page
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms and Conditions - PooluvaGounderMatrimony",
        "description": "Read the Terms and Conditions of PooluvaGounderMatrimony to understand the rules and guidelines for using our matrimony platform.",
        "url": `${baseUrl}/termsconditions`,
        "mainEntity": {
            "@type": "Organization",
            "name": "PooluvaGounderMatrimony",
            "url": baseUrl,
            "contactPoint": {
                "@type": "ContactPoint",
                "email": supportEmail,
                "contactType": "customer service"
            }
        }
    };

    return (
        <>
            <SEO
                title="Terms and Conditions - PooluvaGounderMatrimony Matrimony Platform"
                description="Read the Terms and Conditions of PooluvaGounderMatrimony matrimony platform. Understand the rules, guidelines, and user responsibilities for using our trusted matrimonial services."
                keywords="terms and conditions matrimony, marriage bureau terms, matrimonial platform terms, wedding soul mates terms, matrimony user agreement, marriage website terms, matrimonial service terms, bride groom terms, matrimony platform rules, marriage service terms, shaadi terms, muslim matrimony terms, hindu matrimony terms, christian matrimony terms, sikh matrimony terms, gounder matrimony terms, chettiar matrimony terms, brahmin matrimony terms, vellalar matrimony terms, naidu matrimony terms, reddy matrimony terms, patel matrimony terms, gujarati matrimony terms, marathi matrimony terms, bengali matrimony terms, punjabi matrimony terms, tamil matrimony terms, telugu matrimony terms, malayalam matrimony terms, kannada matrimony terms, hindi matrimony terms, inter caste marriage terms, inter religion marriage terms, all community matrimony terms, india matrimony terms, south indian matrimony terms, north indian matrimony terms, east indian matrimony terms, west indian matrimony terms"
                image={`${baseUrl}/matrimo/images/og-image.png`}
                url={`${baseUrl}/termsconditions`}
                canonical={`${baseUrl}/termsconditions`}
                schema={schemaData}
                type="website"
            />
            <div className="privacy-container p-lg-5 p-3 mb-5">
                <h1>Terms and Conditions</h1>
                <p><strong>Effective Date:</strong> December 2024</p>

                <div className="terms-content">
                    <h2 className='text-start'>1. Introduction</h2>
                    <p>Welcome to <strong>PooluvaGounderMatrimony.com</strong>, operated by <strong>YoungZen Technologies</strong>. By using our website, you agree to the following terms and conditions. Please read these terms carefully. If you do not agree with any part of these terms, you should not use our website.</p>

                    <h2 className='text-start'>2. Eligibility</h2>
                    <p>To use our services, you must be at least 18 years of age and legally capable of entering into a binding contract. By registering with us, you warrant that you meet these eligibility requirements.</p>

                    <h2 className='text-start'>3. User Responsibilities</h2>
                    <ul>
                        <li>You agree to provide accurate, current, and complete information during registration and to update this information to keep it accurate and complete.</li>
                        <li>You are responsible for maintaining the confidentiality of your login credentials and are fully responsible for all activities that occur under your account.</li>
                        <li>You agree not to use the website for any illegal or unauthorized purpose.</li>
                    </ul>

                    <h2 className='text-start'>4. Use of the Website</h2>
                    <p>Our website is intended for personal use only. You may not use the site for any commercial purposes without the prior written consent of <strong>YoungZen Technologies</strong>. Unauthorized use of the site may result in termination of your account.</p>

                    <h2 className='text-start'>5. Content Ownership</h2>
                    <p>All content, including text, images, and graphics, provided on the website is the property of <strong>YoungZen Technologies</strong>. You are granted a limited, non-exclusive, and revocable license to view and use the content for personal purposes only.</p>

                    <h2 className='text-start'>6. Prohibited Conduct</h2>
                    <p>While using the site, you agree not to engage in any of the following activities:</p>
                    <ul>
                        <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with a person or entity.</li>
                        <li>Posting or transmitting any content that is harmful, abusive, defamatory, or otherwise objectionable.</li>
                        <li>Engaging in harassment, threatening, or stalking other users.</li>
                        <li>Uploading any viruses, worms, or other harmful software.</li>
                    </ul>

                    <h2 className='text-start'>7. Termination</h2>
                    <p>We reserve the right to suspend or terminate your account if you violate these terms. Upon termination, your right to use the website will cease immediately.</p>

                    <h2 className='text-start'>8. Privacy Policy</h2>
                    <p>Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy for more information on how we collect and use your data.</p>

                    <h2 className='text-start'>9. Limitation of Liability</h2>
                    <p><strong>YoungZen Technologies</strong> will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or any content provided on the website.</p>

                    <h2 className='text-start'>10. Changes to the Terms</h2>
                    <p>We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and the "Effective Date" at the top of the page will be updated accordingly.</p>

                    <h2 className='text-start'>11. Governing Law</h2>
                    <p>These Terms and Conditions are governed by and construed in accordance with the laws of India/Tamilnadu, and you submit to the exclusive jurisdiction of the courts located in India for the resolution of any disputes.</p>

                    <h2 className='text-start'>12. Contact Us</h2>
                    <p>If you have any questions about these Terms and Conditions, please contact us at:</p>

                    <div className="contact-info">
                        <p><strong>Email:</strong> <a href={`mailto:${supportEmail}`} className='text-black'>{supportEmail}</a></p>
                        <p><strong>Address:</strong> YoungZen Technologies, No 1a, Ground Floor Vasantham Nagar, KovaiPudhur, Coimbatore, Tamilnadu 560032, India.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsAndConditions;
