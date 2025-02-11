import React from 'react';
import 'animate.css';

const AboutSection = () => {
    const features = [
        {
            imgSrc: `${process.env.PUBLIC_URL}/matrimo/images/icon/prize.png`,
            title: 'Genuine profiles',
            description: 'Connect with real, verified profiles for authentic and meaningful relationships.',
            delay: '0.1',
        },
        {
            imgSrc: `${process.env.PUBLIC_URL}/matrimo/images/icon/trust.png`,
            title: 'Most trusted',
            description: 'A trusted platform committed to helping you find your ideal life partner.',
            delay: '0.3',
        },
        {
            imgSrc: `${process.env.PUBLIC_URL}/matrimo/images/icon/rings.png`,
            title: '2000+ weddings',
            description: 'Helping individuals find their perfect match and build lasting relationships.',
            delay: '0.6',
        }
    ];

    return (
        <div>
            {/* First Section: Features */}
            <section>
                <div className="ab-sec2">
                    <div className="container">
                        <div className="row">
                            <ul>
                                {features.map((feature, index) => (
                                    <li key={index}>
                                        <div
                                            className={`animate animate__animated animate__slower`}
                                            data-ani="animate__flipInX"
                                            data-dely={feature.delay}
                                        >
                                            <img src={feature.imgSrc} alt={feature.title} loading="lazy" />
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section: Welcome */}
            <section>
                <div className="ab-wel">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="ab-wel-lhs">
                                    <span className="ab-wel-3"></span>
                                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/about/1.jpg`} alt="" loading="lazy" className="ab-wel-1" />
                                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/couples/20.jpg`} alt="" loading="lazy" className="ab-wel-2" />
                                    <span className="ab-wel-4"></span>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="ab-wel-rhs">
                                    <div className="ab-wel-tit">
                                        <h2>Welcome to <em>Wedding Soul Mates</em></h2>
                                        <p>Your perfect match awaits!. At Wedding Soul Mates, we connect individuals looking for meaningful, lifelong relationships. Our platform is dedicated to helping you find your ideal partner with ease and trust. Whether you're seeking a soulmate or a lifelong companion, we’re here to guide you on your journey toward a beautiful union. Start your path to forever today with Wedding Soul Mates—where love, commitment, and happiness come together.</p>
                                        <p> <a href="/register">Click here to</a> start your matrimony service now.</p>
                                    </div>
                                    <div className="ab-wel-tit-1">
                                        <p>At Wedding Soul Mates, we understand that finding your perfect partner is a unique and personal journey. With our platform, we simplify the process of discovering meaningful connections, offering a safe and supportive space for those seeking lifelong companionship. Join us today and take the first step toward a beautiful, committed relationship built on love and trust.</p>
                                    </div>
                                    <div className="ab-wel-tit-2">
                                        <ul>
                                            <li >
                                                <div>
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                    <h4>Enquiry <a href="tel:+91-4223568392"><em>+91-4223568392</em></a></h4>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                    <h4>Get Support <a href="mailto:info@weddingsoulmates.com"><em>info@weddingsoulmates.com</em></a></h4>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;

