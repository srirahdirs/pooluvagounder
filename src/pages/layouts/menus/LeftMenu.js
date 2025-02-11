import React, { useState, useEffect } from "react";
import CashfreePayment from "../../../components/CashfreePayment";
import { useSelector } from "react-redux";
const LeftMenu = () => {
    const planId = useSelector((state) => state.pricing.selectedPlanId);
    const plans = {
        1: { name: "Silver", price: "1400", validity: "1 month" },
        2: { name: "Gold", price: "4999", validity: "6 months" },
        3: { name: "Platinum", price: "9999", validity: "12 months" }
    };

    const selectedPlan = plans[planId];
    const planPrice = selectedPlan?.price

    return (
        <div className="menu-pop menu-pop1">
            <span className="menu-pop-clo"><i className="fa fa-times" aria-hidden="true"></i></span>
            <div className="inn">
                <img src={`${process.env.PUBLIC_URL}/matrimo/images/weddingsoulmates_matrimony.png`} alt="" loading="lazy" className="logo-brand-only" />
                <p><strong>Wedding Soul Mates </strong> is rapidly becoming one of the leading Tamil matchmaking services.</p>

                {/* Display selected plan details */}
                {selectedPlan ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center">
                        <span className="mb-8"> Plan Details</span>
                        <h3 className="text-xl font-bold mb-2"> {selectedPlan.name} Plan</h3>
                        <p className="text-gray-700 mb-1"><strong>Price:</strong> {selectedPlan.price}</p>
                        <p className="text-gray-700 mb-1"><strong>Validity:</strong> {selectedPlan.validity}</p>
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-600 mb-4">No plan selected.</p>
                )}

                <div className="menu-pop-help">
                    <div className="user-bio">
                        <button className="btn btn-primary btn-sm">
                            <CashfreePayment planId={planId} planPrice={planPrice} />
                        </button>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="menu-pop-soci">
                    <ul>
                        <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                        <li><a href="#!"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;
