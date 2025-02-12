import React, { useState } from 'react';
import Slider from "react-slick"; // Assuming you're using react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServicesSection from './Home/ServiceSection';
import AboutSection from './Home/AboutSection';
import SearchSection from './Home/SearchSection';

const Home = () => {

    // Slider settings for react-slick
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <SearchSection />


            {/* Banner Slider */}
            <section>
                <div className="hom-ban-sli">
                    <Slider {...sliderSettings}>
                        <div className="image">
                            <img src={`${process.env.PUBLIC_URL}/matrimo/images/ban-bg.jpg`} alt="Banner" loading="lazy" />
                        </div>
                        <div className="image">
                            <img src={`${process.env.PUBLIC_URL}/matrimo/images/banner1.jpg`} style={{ width: '100%' }} alt="Banner" loading="lazy" />
                        </div>
                    </Slider>
                </div>
            </section>
            <ServicesSection />
            <AboutSection />
            <section>
                <div className="str count">
                    <div className="container">
                        <div className="row">
                            <div className="fot-ban-inn">
                                <div className="lhs">
                                    <h2>Find your perfect Match now</h2>
                                    <p>Discover your ideal partner today. Experience true connection and lasting love. <b>Wedding Soul Mates</b> helps you find the perfect match with ease.</p>
                                    <a href="/register" className="cta-3">Register Now</a>
                                    <a href="/contact" className="cta-4">Help & Support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Home;


