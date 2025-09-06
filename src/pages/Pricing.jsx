import React from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { useNavigate } from "react-router-dom";
import LeftMenu from "./layouts/menus/LeftMenu";
import { setSelectedPlanId, setPlanPrice } from "../features/pricingSlice";
import SEO from "../components/SEO"; // Import SEO component

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const user_id = user?.id ? user.id : 0;
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.pricing); // Access isModalOpen from Redux store
  const activePlanPrice = user?.active_plan?.plan_price;
  const loginRequired = () => {
    navigate("/login");
  };
  const plans = {
    1: { name: "Silver", price: "149900", validity: "1 month", originalPrice: "200000" }, // ₹1,499 with ₹2,000 original = 25% OFF
    2: { name: "Gold", price: "499900", validity: "6 months", originalPrice: "700000" }, // ₹4,999 with ₹7,000 original = 29% OFF
    3: { name: "Platinum", price: "999900", validity: "12 months", originalPrice: "1500000" }, // ₹9,999 with ₹15,000 original = 33% OFF
  };
  const formatPrice = (price) => {
    return (price / 100).toLocaleString("en-IN");
  };

  // Calculate offer percentage based on original price
  const calculateOfferPercentage = (offerPrice, originalPrice) => {
    // Formula: Offer % = ((Original Price - Offer Price) / Original Price) * 100
    const percentage = ((originalPrice - offerPrice) / originalPrice) * 100;
    return Math.round(percentage);
  };
  const handlePlanSelection = (id) => {
    dispatch(setSelectedPlanId(id));
    const selectedPlan = plans[id];
    dispatch(setPlanPrice(selectedPlan?.price)); // Set the selected plan ID in Redux store
  };
  console.log(user);

  // JSON-LD schema for pricing plans
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "WeddingSoulMates Subscription Plans",
    description:
      "Choose from our flexible subscription plans and get started with WeddingSoulMates.",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Silver Plan",
          description: "1 month subscription with basic features",
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: "1499",
            validFor: "P1M",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
            },
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gold Plan",
          description: "6 months subscription with extended features",
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: "4999",
            validFor: "P6M",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
            },
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Platinum Plan",
          description: "12 months subscription with premium features",
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: "9999",
            validFor: "P12M",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
            },
          },
        },
      },
    ],
  };

  return (
    <>
      {/* Add SEO metadata */}
      <SEO
        title="WeddingSoulMates Pricing Plans - Affordable Matrimony Subscription | Silver Gold Platinum"
        description="Choose from WeddingSoulMates flexible subscription plans - Silver, Gold, and Platinum. Affordable matrimony services for all communities. Start your journey to find your perfect life partner today!"
        keywords="matrimony pricing, marriage bureau pricing, matrimonial subscription plans, wedding soul mates pricing, shaadi pricing, muslim matrimony pricing, hindu matrimony pricing, christian matrimony pricing, sikh matrimony pricing, gounder matrimony pricing, chettiar matrimony pricing, all community matrimony pricing, india matrimony pricing, inter caste marriage pricing, inter religion marriage pricing, silver plan matrimony, gold plan matrimony, platinum plan matrimony, matrimony subscription, marriage service pricing, matrimonial website pricing, affordable matrimony, matrimony plans, marriage bureau subscription, matrimonial service pricing"
        schema={pricingSchema} // Pass schema data to SEO component
      />

      <section>
        <div className="plans-ban">
          <div className="container">
            <div className="row">
              <span className="pri">Pricing Plans</span>
              <h1>Choose Your Plan and Get Started</h1>
              <p>
                Select the best plan that fits your needs. Enjoy great features
                at unbeatable prices.
              </p>
              <span className="nocre">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="plans-main">
          <div className="container">
            <div className="row">
              <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                {/* Silver Plan */}
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="pri-box">
                    <h2>Silver</h2>
                    <p>
                      Perfect for exploring our platform with basic features.
                    </p>
                    {user_id ? (
                      Number(activePlanPrice) === Number(plans[1].price) ? (
                        <a className="cta disabled" href="#" style={{ 'background': 'green' }}>Selected Plan</a>
                      ) : (
                        <a
                          href="#"
                          className="cta desk-menu fol cta-chat"
                          onClick={() => handlePlanSelection(1)}
                        >
                          Get Started
                        </a>
                      )
                    ) : (
                      <a onClick={loginRequired} className="cta">
                        Get Started
                      </a>
                    )}
                    <span className="pri-cou">
                      <b>&#8377;{formatPrice(plans[1]?.price)}</b>
                    </span>
                    <small>(1 month)</small>
                    <br />
                    <span className="discount">
                      <strike>&#8377;{formatPrice(plans[1]?.originalPrice)}</strike>
                    </span>
                    <span className="offer-badge">{calculateOfferPercentage(plans[1]?.price, plans[1]?.originalPrice)}% OFF</span>
                    <span className="pop-pln">Basic Plan</span>

                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        15 Premium Profiles view /mo
                      </li>

                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        View contact details
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        Send interest
                      </li>
                      <li>
                        <i className="fa fa-close close" aria-hidden="true"></i> Premium User Benefits
                      </li>
                      <li>
                        <i className="fa fa-close close" aria-hidden="true"></i> Horoscope View
                      </li>
                      <li>
                        <i className="fa fa-close close" aria-hidden="true"></i> Priority Customer Support
                      </li>
                      <li>
                        <i className="fa fa-close close" aria-hidden="true"></i>{" "}
                        No chat feature
                      </li>
                    </ol>
                  </div>
                </li>

                {/* Gold Plan */}
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="pri-box pri-box-pop">
                    <span className="pop-pln">Most Popular Plan</span>
                    <h2>Gold</h2>
                    <p>
                      Get the best features with increased profile views and
                      interaction.
                    </p>
                    {user_id ? (
                      Number(activePlanPrice) === Number(plans[2].price) ? (
                        <a className="cta disabled" href="#" style={{ 'background': 'green' }}>Selected Plan</a>
                      ) : (
                        <a
                          href="#"
                          className="cta desk-menu fol cta-chat"
                          onClick={() => handlePlanSelection(2)}
                        >
                          Get Started
                        </a>
                      )
                    ) : (
                      <a onClick={loginRequired} className="cta">
                        Get Started
                      </a>
                    )}
                    <span className="pri-cou">
                      <b>&#8377;{formatPrice(plans[2]?.price)}</b>
                    </span>
                    <small>(6 months)</small>
                    <br />
                    <span className="discount">
                      <strike>&#8377;{formatPrice(plans[2]?.originalPrice)}</strike>
                    </span>
                    <span className="offer-badge">{calculateOfferPercentage(plans[2]?.price, plans[2]?.originalPrice)}% OFF</span>
                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> 100
                        Premium Profiles view /mo
                      </li>

                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> View
                        contact details
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Send
                        interest
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Premium User Benefits
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Horoscope View
                      </li>


                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Priority Customer Support
                      </li>
                      <li>
                        <i className="fa fa-close close" aria-hidden="true"></i>{" "}
                        No chat feature
                      </li>
                    </ol>
                  </div>
                </li>

                {/* Platinum Plan */}
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="pri-box">
                    <h2>Platinum</h2>
                    <p>
                      Our top-tier plan with the highest number of profile views
                      and full access to features.
                    </p>
                    {user_id ? (
                      Number(activePlanPrice) === Number(plans[3].price) ? (
                        <a className="cta disabled" href="#" style={{ 'background': 'green' }}>Selected Plan</a>
                      ) : (
                        <a
                          href="#"
                          className="cta desk-menu fol cta-chat"
                          onClick={() => handlePlanSelection(3)}
                        >
                          Get Started
                        </a>
                      )
                    ) : (
                      <a onClick={loginRequired} className="cta">
                        Get Started
                      </a>
                    )}
                    <span className="pri-cou">
                      <b>&#8377;{formatPrice(plans[3]?.price)}</b>
                    </span>
                    <small>(12 months)</small>
                    <br />
                    <span className="discount">
                      <strike>&#8377;{formatPrice(plans[3]?.originalPrice)}</strike>
                    </span>
                    <span className="offer-badge">{calculateOfferPercentage(plans[3]?.price, plans[3]?.originalPrice)}% OFF</span>
                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Unlimited
                        Premium Profiles view
                      </li>

                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> View
                        contact details
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Send
                        interest
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Premium User Benefits
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Horoscope View
                      </li>


                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Priority Customer Support
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Chat
                        feature
                      </li>
                    </ol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LeftMenu isModalOpen={isModalOpen} />
    </>
  );
};

export default Pricing;
