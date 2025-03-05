import { React } from "react";
import UserLeftMenu from "./UserLeftMenu";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';

const UserPlan = () => {
    const { user } = useAuth();
    const activePlan = user?.active_plan;

    // Determine the plan name based on the active plan's price
    let planName = "No Plan Selected";
    if (activePlan?.plan_price === 1499) {
        planName = "Silver";
    } else if (activePlan?.plan_price === 4999) {
        planName = "Gold";
    } else if (activePlan?.plan_price === 9999) {
        planName = "Platinum";
    }

    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }

    return (
        <>
            <section>
                <div className="db">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <UserLeftMenu />
                            </div>
                            <div className="col-md-8 col-lg-9">
                                <div className="row">
                                    <div className="col-md-4 db-sec-com">
                                        <h2 className="db-tit">Plan details</h2>
                                        <div className="db-pro-stat">
                                            <h6 className="tit-top-curv">Current plan</h6>
                                            <div className="db-plan-card">
                                                <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/plan.png`} alt="" />
                                            </div>
                                            <div className="db-plan-detil">
                                                <ul>
                                                    {activePlan && activePlan.status === 'Approved' ? (
                                                        <>
                                                            <li>Plan name: <strong>{planName}</strong></li>
                                                            <li>Price: <strong>&#8377;{activePlan.plan_price}</strong></li>
                                                            <li>Valid till: <strong>{new Date(activePlan.expiry_date).toLocaleDateString()}</strong></li>
                                                            <li><a href="/pricing" className="cta-3">Upgrade now</a></li>
                                                        </>
                                                    ) : (
                                                        <li>No plan selected</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 db-sec-com">
                                        <h2 className="db-tit">All Plans</h2>
                                        <div className="db-invoice">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Plan type</th>
                                                        <th>Duration</th>
                                                        <th>Cost</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Silver</td>
                                                        <td>1 Month</td>
                                                        <td>&#8377;1499</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gold</td>
                                                        <td>6 Months</td>
                                                        <td>&#8377;4999</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Platinum</td>
                                                        <td>12 Months</td>
                                                        <td>&#8377;9999</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 db-sec-com">
                                        <div className="alert alert-warning db-plan-canc">
                                            {activePlan && activePlan.status === 'Approved' ? (
                                                <>
                                                    <p>Enjoy plan benefits until <strong>{new Date(activePlan.expiry_date).toLocaleDateString()}</strong>.</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p><strong>No active plan:</strong> Upgrade to a premium plan to enjoy the following benefits:</p>
                                                    <ul>
                                                        <li>Access to all premium profiles.</li>
                                                        <li>Send interest.</li>
                                                        <li>View contact details of matches.</li>
                                                        <li>View photos of partner's profiles.</li>
                                                        <li>Get priority customer support.</li>
                                                    </ul>
                                                    <p><a href="/pricing" className="cta-3">Upgrade now</a> </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserPlan;
