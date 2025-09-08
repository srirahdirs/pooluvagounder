import React, { useState } from 'react';
import Slider from "react-slick"; // Assuming you're using react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServicesSection from './Home/ServiceSection';
import AboutSection from './Home/AboutSection';
import SearchSection from './Home/SearchSection';
import SEO from '../components/SEO';

const Home = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pooluvagounder.com/' : 'http://localhost:3000';

    // Comprehensive structured data for matrimonial website
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "PooluvaGounderMatrimony - Gounder Community Matrimony",
        "url": baseUrl,
        "description": "Find your perfect Gounder life partner with PooluvaGounderMatrimony - Tamil Nadu's trusted Gounder community matrimony platform. Connect with verified Gounder, Pooluva Gounder, VettuvaGounder, Vettuvar, and Pooluvar brides and grooms from Coimbatore, Chennai, and across Tamil Nadu.",
        "publisher": {
            "@type": "Organization",
            "name": "PooluvaGounderMatrimony",
            "url": baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/matrimo/images/PooluvaGounderMatrimony.png`
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "No 1a, Ground Floor, Vasantham Nagar, KovaiPudhur",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "postalCode": "641042",
                "addressCountry": "IN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-4223568392",
                "contactType": "customer service",
                "availableLanguage": "English"
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        },
        "mainEntity": {
            "@type": "Service",
            "name": "Gounder Community Matrimonial Services",
            "description": "Trusted Gounder community matrimony and matchmaking services for finding life partners within the Gounder community",
            "provider": {
                "@type": "Organization",
                "name": "PooluvaGounderMatrimony"
            },
            "serviceType": "Gounder Community Matrimonial Services",
            "areaServed": {
                "@type": "Country",
                "name": "India"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Matrimony Plans",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Basic Matrimony Plan"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Premium Matrimony Plan"
                        }
                    }
                ]
            }
        }
    };

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
            <SEO
                title="PooluvaGounderMatrimony - Find Your Perfect Life Partner | Trusted Matrimony Platform"
                description="Join PooluvaGounderMatrimony, India's most trusted matrimony platform. Find your perfect life partner from thousands of verified profiles. Start your journey to lifelong happiness today!"
                keywords="matrimony, marriage, wedding, bride, groom, matrimonial, matchmaking, life partner, marriage bureau, wedding planning, matrimonial site, marriage website, find partner, marriage service, trusted matrimony, verified profiles, marriage bureau India, matrimonial services, wedding soul mates, marriage platform, find bride, find groom, matrimonial website India, shaadi, muslim matrimony, hindu matrimony, christian matrimony, sikh matrimony, gounder matrimony, chettiar matrimony, brahmin matrimony, vellalar matrimony, naidu matrimony, reddy matrimony, patel matrimony, gujarati matrimony, marathi matrimony, bengali matrimony, punjabi matrimony, tamil matrimony, telugu matrimony, malayalam matrimony, kannada matrimony, hindi matrimony, inter caste marriage, inter religion marriage, all community matrimony, india matrimony, south indian matrimony, north indian matrimony, east indian matrimony, west indian matrimony, free matrimony registration, verified profiles, trusted matrimony"
                image={`${baseUrl}/matrimo/images/og-image.png`}
                url={baseUrl}
                canonical={baseUrl}
                schema={schemaData}
                type="website"
            />
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
                        <div className="image">
                            <img src={`${process.env.PUBLIC_URL}/matrimo/images/PooluvaGounderMatrimony.com.jpg`} style={{ width: '100%' }} alt="Banner" loading="lazy" />
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
                                    <p>Discover your ideal partner today. Experience true connection and lasting love. <b>PooluvaGounder Matrimony</b> helps you find the perfect match with ease.</p>
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


