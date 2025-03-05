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
    1: { name: "Silver", price: "1499", validity: "1 month" },
    2: { name: "Gold", price: "4999", validity: "6 months" },
    3: { name: "Platinum", price: "9999", validity: "12 months" },
  };
  const handlePlanSelection = (id) => {
    dispatch(setSelectedPlanId(id));
    const selectedPlan = plans[id];
    dispatch(setPlanPrice(selectedPlan?.price)); // Set the selected plan ID in Redux store
  };

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
        title="WeddingSoulMates - Pricing Plans"
        description="Choose from our flexible subscription plans and get started with WeddingSoulMates. Explore Silver, Gold, and Platinum plans with unique benefits."
        keywords="WeddingSoulMates, pricing, subscription plans, matchmaking, premium features, Silver plan, Gold plan, Platinum plan"
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
                      <b>&#8377;{plans[1]?.price}</b>
                    </span>
                    <small>(1 month)</small>
                    <br />
                    <span className="discount">
                      <strike>&#8377; 2000</strike>
                    </span>
                    <span className="pop-pln">Basic Plan</span>

                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        15 Premium Profiles view /mo
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Free
                        user profile view
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        contact details view
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i>{" "}
                        Can't send interest
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
                      <b>&#8377;{plans[2]?.price}</b>
                    </span>
                    <small>(6 months)</small>
                    <br />
                    <span className="discount">40% Off</span>
                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> 50
                        Premium Profiles view /mo
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Free
                        user profile view
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
                      <b>&#8377;{plans[3]?.price}</b>
                    </span>
                    <small>(12 months)</small>
                    <br />
                    <span className="discount">50% Off</span>
                    <ol>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> 100
                        Premium Profiles view /mo
                      </li>
                      <li>
                        <i className="fa fa-check" aria-hidden="true"></i> Free
                        user profile view
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
