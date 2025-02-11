import { React } from "react";
import UserLeftMenu from "./UserLeftMenu";
const UserPlan = () => {

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
                                                    <li>Plan name: <strong>Standard</strong></li>
                                                    <li>Validity: <strong>6 Months</strong></li>
                                                    <li>Valid till <strong>24 June 2024</strong></li>
                                                    <li><a href="#" className="cta-3">Upgrade now</a></li>
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
                                                        {/* <th>Invoice</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Silver</td>
                                                        <td>1 Months </td>
                                                        <td>&#8377;1400</td>
                                                        {/* <td><a href="#" className="cta-dark cta-sml" download><span>Download</span></a></td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>Gold</td>
                                                        <td>6 Months</td>
                                                        <td>&#8377;4999</td>
                                                        {/* <td><a href="#" className="cta-dark cta-sml" download><span>Download</span></a></td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>Platinum</td>
                                                        <td>12 Months</td>
                                                        <td>&#8377;9999</td>
                                                        {/* <td><a href="#" className="cta-dark cta-sml" download><span>Download</span></a></td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 db-sec-com">
                                        <div className="alert alert-warning db-plan-canc">
                                            {/* <p><strong>Plan cancellation:</strong> <a href="#" data-bs-toggle="modal" data-bs-target="#plancancel">Click here</a> to cancell the current plan.</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default UserPlan;