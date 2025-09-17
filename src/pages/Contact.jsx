import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Toast } from 'primereact/toast';
import { useToast } from '../assets/utils/toastUtil';
import config from '../config';
import SEO from '../components/SEO';

const Contact = () => {
    const youngZenEmail = config?.youngZenEmail;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { toast, showToast } = useToast();
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pooluvagounder.com' : 'http://localhost:3000';

    // Structured data for Contact page
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact PooluvaGounderMatrimony - Gounder Community Matrimony",
        "description": "Get in touch with PooluvaGounderMatrimony for Gounder community matrimonial services support. Contact our customer service team for assistance with your Gounder matrimony journey.",
        "url": `${baseUrl}/contact`,
        "mainEntity": {
            "@type": "Organization",
            "name": "PooluvaGounderMatrimony",
            "url": baseUrl,
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": "+91-4223568392",
                    "contactType": "customer service",
                    "availableLanguage": "English",
                    "areaServed": "IN"
                },
                {
                    "@type": "ContactPoint",
                    "email": youngZenEmail,
                    "contactType": "customer service",
                    "availableLanguage": "English"
                }
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "No 1a, Ground Floor, Vasantham Nagar, KovaiPudhur",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "postalCode": "641042",
                "addressCountry": "IN"
            }
        }
    };

    // EmailJS onSubmit handler
    const onSubmit = (data) => {


        // Format the data in an aligned format
        const formattedMessage = `
            <h3>Enquiry Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `;

        // Set the formatted message to the form data
        form.current.message.value = formattedMessage;  // Assuming message field is present

        emailjs.sendForm('service_gfc4rcx', 'template_f6q6kmo', form.current, 'stL-vc00jNZZapS8P')
            .then((result) => {
                showToast("Your enquiry has been sent successfully!");

                // Reset the form after successful submission
                form.current.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                showToast("There was an issue sending your enquiry. Please try again.", 'error');
            });
    };

    // Create form reference
    const form = useRef();

    return (
        <>
            <SEO
                title="Contact PooluvaGounderMatrimony - Get Support for Your Gounder Matrimony Journey"
                description="Contact PooluvaGounderMatrimony for Gounder community matrimonial services support. Get help with your Gounder, Pooluva Gounder, VettuvaGounder, Vettuvar, and Pooluvar matrimony journey, profile creation, and finding your perfect life partner. Call +91-4223568392 or email us."
                keywords="contact gounder matrimony, gounder marriage bureau contact, gounder matrimonial support, gounder community contact, gounder matrimony help, gounder marriage service support, gounder matrimonial customer service, gounder wedding planning contact, gounder shaadi contact, tamil gounder matrimony contact, coimbatore gounder matrimony contact, chennai gounder matrimony contact, gounder community support, gounder caste matrimony contact, gounder family matrimony contact, gounder traditional marriage contact, gounder cultural wedding contact, gounder community website contact, gounder matrimonial platform contact, gounder brides contact, gounder grooms contact, gounder profiles contact, trusted gounder matrimony support, verified gounder profiles contact, gounder marriage service contact, gounder matrimonial website contact, contact pooluva gounder, contact pooluva gounder matrimony, contact vettuvagounder matrimony, contact vettuvar, contact pooluvar, pooluva gounder community contact, vettuvagounder community contact, vettuvar community contact, pooluvar community contact, pooluva gounder marriage contact, vettuvagounder marriage contact, vettuvar marriage contact, pooluvar marriage contact"
                image={`${baseUrl}/matrimo/images/og-image.png`}
                url={`${baseUrl}/contact`}
                canonical={`${baseUrl}/contact`}
                schema={schemaData}
                type="website"
            />
            <Toast ref={toast} />
            <section>
                <div className="str">
                    <div className="ban-inn ab-ban pg-cont">
                        <div className="container">
                            <div className="row">
                                <div className="hom-ban">
                                    <div className="ban-tit">
                                        <span>We are here to assist you.</span>
                                        <h1>Contact us</h1>
                                        <p>Your Most Trusted Premium Matrimony Platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Section */}
            <section>
                <div className="ab-sec2 pg-cont">
                    <div className="container">
                        <div className="row">
                            <ul>
                                <li>
                                    <div className="we-cont">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/trust.png`} alt="Customer Relations" />
                                        <h4>Customer Relations</h4>
                                        <p>Our dedicated team is here to help you with any questions or concerns. We pride ourselves on offering the most trusted and premium matrimony services in the world.</p>
                                        <a
                                            href="#"
                                            className="cta-rou-line disabled-link"
                                            data-toggle="tooltip"  // Enable the tooltip functionality
                                            title="Exciting things are on the way! Our website is under construction and will be live soon. Stay tuned!"  // Tooltip text
                                            onClick={(e) => e.preventDefault()}  // Prevents the default action (no page reload)
                                            style={{ cursor: "not-allowed" }}  // Optional: Show a "not allowed" cursor
                                        >
                                            Get Support
                                        </a>





                                    </div>
                                </li>
                                <li>
                                    <div className="we-here">
                                        <h3 style={{ textAlign: 'center' }}>Our Office</h3>
                                        <p>YoungZen Technologies</p>

                                        <span><i className="fa fa-envelope-o" aria-hidden="true"></i><a href={`mailto:${youngZenEmail}`}> {youngZenEmail}</a></span>
                                        <span><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:+91-4223568392">+91-4223568392</a></span>
                                        <span><i className="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://wa.me/919789253515" target="_blank" rel="noopener noreferrer">+91 9789253515</a></span>
                                        <span><i className="fa fa-map-marker" aria-hidden="true"></i> No 1a, Ground Floor, Vasantham Nagar, KovaiPudhur, Coimbatore, Tamilnadu 641042, India.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="we-cont">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/telephone.png`} alt="WhatsApp Support" />
                                        <h4>WhatsApp Support</h4>
                                        <p>Contact us directly on WhatsApp for instant support. Our team is available to assist you with any inquiries you may have regarding our services.</p>
                                        <a href="https://wa.me/919789253515" className="cta-rou-line" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* Contact Form Section */}
            < section >
                <div className="login pg-cont">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="lhs">
                                    <div className="tit">
                                        <h2>Now <b>Contact us</b> easily and quickly.</h2>
                                    </div>
                                    <div className="im">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/login-couple.png`} alt="Couple" />
                                    </div>
                                    <div className="log-bg">&nbsp;</div>
                                </div>
                                <div className="rhs">
                                    <div>
                                        <div className="form-tit">
                                            <h4>Let's talk</h4>
                                            <h1>Send your enquiry now</h1>
                                        </div>
                                        <div className="form-login">
                                            {/* Contact Form */}
                                            <form ref={form} onSubmit={handleSubmit(onSubmit)} className="cform fvali">

                                                {/* Name Field */}
                                                <div className="form-group">
                                                    <label className="lb">Name:<span>*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter your full name"
                                                        {...register("name", { required: "Name is required" })}
                                                    />
                                                    {errors.name && <span>{errors.name.message}</span>}
                                                </div>

                                                {/* Email Field */}
                                                <div className="form-group">
                                                    <label className="lb">Email:<span>*</span></label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        {...register("email", { required: "Email is required" })}
                                                    />
                                                    {errors.email && <span>{errors.email.message}</span>}
                                                </div>

                                                {/* Phone Field */}
                                                <div className="form-group">
                                                    <label className="lb">Phone:<span>*</span></label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Enter phone number"
                                                        minLength={10}
                                                        maxLength={10}
                                                        {...register("phone", { required: "Phone is required" })}
                                                    />
                                                    {errors.phone && <span>{errors.phone.message}</span>}
                                                </div>

                                                {/* Message Field */}
                                                <div className="form-group">
                                                    <label className="lb">Message:<span>*</span></label>
                                                    <textarea
                                                        name="message"
                                                        className="form-control"
                                                        placeholder="Enter message"
                                                        {...register("message", { required: "Message is required" })}
                                                    />
                                                    {errors.message && <span>{errors.message.message}</span>}
                                                </div>

                                                <button type="submit" className="btn btn-primary">Send Enquiry</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Contact;
