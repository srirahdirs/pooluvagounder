import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Toast } from 'primereact/toast';
import { useToast } from '../assets/utils/toastUtil';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { toast, showToast } = useToast();

    // EmailJS onSubmit handler
    const onSubmit = (data) => {
        emailjs.sendForm('service_gfc4rcx', 'template_f6q6kmo', form.current, 'stL-vc00jNZZapS8P')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                showToast("Your enquiry has been sent successfully!");
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

                                        <span><i className="fa fa-envelope-o" aria-hidden="true"></i> info@youngzen.in</span>
                                        <span><i className="fa fa-phone" aria-hidden="true"></i> +91-4223568392</span>
                                        <span><i className="fa fa-map-marker" aria-hidden="true"></i> No 8a, 8th Cross, Sultanpalya Main Road, RT Nagar, Bangalore 560032, Karnataka, India.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="we-cont">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/telephone.png`} alt="WhatsApp Support" />
                                        <h4>WhatsApp Support</h4>
                                        <p>Contact us directly on WhatsApp for instant support. Our team is available to assist you with any inquiries you may have regarding our services.</p>
                                        <a href="https://whatsapp.com/channel/0029Vb0i0A977qVRhoJKR80e" className="cta-rou-line" target="_blank" rel="noopener noreferrer">Join Channel</a>
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
                                                    <label className="lb">Name:</label>
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
                                                    <label className="lb">Email:</label>
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
                                                    <label className="lb">Phone:</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter phone number"
                                                        {...register("phone", { required: "Phone is required" })}
                                                    />
                                                    {errors.phone && <span>{errors.phone.message}</span>}
                                                </div>

                                                {/* Message Field */}
                                                <div className="form-group">
                                                    <label className="lb">Message:</label>
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
