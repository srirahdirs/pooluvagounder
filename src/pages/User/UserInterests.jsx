import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Toast } from 'primereact/toast';
import { useToast } from '../../assets/utils/toastUtil';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserLeftMenu from './UserLeftMenu';

const UserInterests = () => {
    const { user } = useAuth();
    const { toast, showToast } = useToast();
    const [InterestedProfiles, setInterestedProfiles] = useState([]);
    const [IncomingInterests, setIncomingInterests] = useState([]);
    const [showDot, setShowDot] = useState(false);

    const apiUrl = config?.apiUrl;
    const isPaidUser = user?.premium_user;

    useEffect(() => {
        fetchData('getSentInterests', setInterestedProfiles);
        fetchData('getIncomingInterests', setIncomingInterests);
    }, [user]);

    useEffect(() => {
        const newRequests = IncomingInterests.some(interest =>
            interest.status !== 'Accepted' && interest.status !== 'Rejected'
        );
        setShowDot(newRequests);
    }, [IncomingInterests]);

    const fetchData = async (endpoint, setState) => {
        if (apiUrl && user) {
            const fullApiUrl = `${apiUrl}${endpoint}/${user?.id}`;
            try {
                const response = await fetch(fullApiUrl);
                const data = await response.json();
                if (response.ok) {
                    setState(data);
                } else {
                    console.error(`Failed to fetch ${endpoint}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleInterestResponse = async (id, status) => {
        if (apiUrl) {
            const fullApiUrl = `${apiUrl}updateInterest`;
            try {
                const response = await fetch(fullApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, status }),
                });
                if (response.ok) {
                    showToast(`Interest ${status.toLowerCase()} successfully`);
                    fetchData('getIncomingInterests', setIncomingInterests);
                } else {
                    showToast('error', 'Error', `Failed to ${status.toLowerCase()} interest`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const renderProfile = (profile, buttonActions = true) => {
        const encodedUserId = btoa(profile.user_id.toString());
        const profileLink = `/profiledetails/${encodeURIComponent(encodedUserId)}`;

        return (
            <li key={profile.user_id}>
                <div className="db-int-pro-1">
                    <img
                        src={profile.user_profile_picture || `${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`}
                        alt={profile.name}
                    />
                    {profile.premium_user === 1 && (
                        <span className="badge bg-warning user-prem-pat">Premium User</span>
                    )}
                </div>
                <div className="db-int-pro-2 user_interests_ol">
                    <h5>{profile.name || 'Name not available'}</h5>
                    <ol className="poi">
                        <li>City: <strong>{profile.city || 'City not available'}</strong></li>
                        <li>State: <strong>{profile.state || 'State not available'}</strong></li>
                        <li>Age: <strong>{profile.age || 'Age not available'}</strong></li>
                        <li>Job: <strong>{profile.job || 'Not available'}</strong></li>
                    </ol>
                    <ol className="poi poi-date">
                        <li>Request on: {new Date(profile.requested_on).toLocaleString()}</li>
                        {profile.status === 'Accepted' && (
                            <li className='text-success'>Accepted on: {new Date(profile.updated_on).toLocaleString()}</li>
                        )}
                        {profile.status === 'Rejected' && (
                            <li className='text-danger'>Rejected on: {new Date(profile.updated_on).toLocaleString()}</li>
                        )}
                    </ol>
                    <a href={profileLink} className="cta-5" target="_blank" rel="noopener noreferrer">
                        View full profile
                    </a>
                </div>

                {buttonActions && (
                    <div className="db-int-pro-3">
                        {profile.status === 'Rejected' ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleInterestResponse(profile.id, 'Accepted')}
                                >
                                    Accept
                                </button>
                                <span className="status-text text-danger">{profile.status}</span>
                            </>
                        ) : profile.status === 'Accepted' ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleInterestResponse(profile.id, 'Rejected')}
                                >
                                    Reject
                                </button>
                                <span className="status-text text-success">{profile.status}</span>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleInterestResponse(profile.id, 'Accepted')}
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleInterestResponse(profile.id, 'Rejected')}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                )}
            </li>
        );
    };

    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }

    return (
        <>
            <section>
                <Toast ref={toast} />
                <div className="db user_interests">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <UserLeftMenu />
                            </div>

                            {/* Conditionally apply blur and overlay */}
                            <div className="col-md-8 col-lg-9">
                                {!isPaidUser ? (
                                    <div className="blurred-section_user_interests">
                                        <div className="premium-overlay_user_interests">
                                            <p>You must upgrade to a premium membership to view and interact with interests.</p>
                                            <a href="/premium" className="btn btn-primary">Upgrade Now</a>
                                        </div>
                                        <div className="blurred-content_user_interests">
                                            <div className="row">
                                                <div className="col-md-12 db-sec-com">
                                                    <div className="db-pro-stat">
                                                        <h2 className="db-tit">Interest Requests</h2>
                                                        <div className="db-inte-main">
                                                            {/* Tabs */}
                                                            <ul className="nav nav-tabs" role="tablist">
                                                                <li className="nav-item">
                                                                    <a className="nav-link" data-bs-toggle="tab" href="#home">Sent Interests</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link active" data-bs-toggle="tab" href="#menu1">
                                                                        Incoming Interests
                                                                        {IncomingInterests.length >= 1 && showDot && (
                                                                            <span className="notification-dot"></span>
                                                                        )}
                                                                    </a>
                                                                </li>
                                                                {/* <li className="nav-item">
                                                                    <a className="nav-link" data-bs-toggle="tab" href="#menu2">Accepted / Declined Interests</a>
                                                                </li> */}
                                                            </ul>

                                                            <div className="tab-content">
                                                                {/* Sent Interests */}
                                                                <div id="home" className="container tab-pane fade">
                                                                    <br />
                                                                    <div className="db-inte-prof-list">
                                                                        <ul>
                                                                            {InterestedProfiles.length > 0 ? (
                                                                                InterestedProfiles.map(profile => renderProfile(profile, false))
                                                                            ) : (
                                                                                <p>No interests sent</p>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                {/* Incoming Interests */}
                                                                <div id="menu1" className="container tab-pane active">
                                                                    <br />
                                                                    <div className="db-inte-prof-list">
                                                                        <ul>
                                                                            {IncomingInterests.length > 0 ? (
                                                                                IncomingInterests.map(profile => renderProfile(profile))
                                                                            ) : (
                                                                                <p>No incoming interests</p>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                {/* Accepted / Declined Interests */}
                                                                {/* <div id="menu2" className="container tab-pane fade">
                                                                    <br />
                                                                    <div className="db-inte-prof-list">
                                                                        <ul>
                                                                            {IncomingInterests.length > 0 ? (
                                                                                IncomingInterests.map(profile => renderProfile(profile))
                                                                            ) : (
                                                                                <p>No accepted or declined interests</p>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Full content for paid users without blur
                                    <div className="row">
                                        <div className="col-md-12 db-sec-com">
                                            <div className="db-pro-stat">
                                                <h2 className="db-tit">Interest Requests</h2>
                                                <div className="db-inte-main">
                                                    {/* Tabs */}
                                                    <ul className="nav nav-tabs" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab" href="#home">Sent Interests</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-bs-toggle="tab" href="#menu1">
                                                                Incoming Interests
                                                                {IncomingInterests.length >= 1 && showDot && (
                                                                    <span className="notification-dot"></span>
                                                                )}
                                                            </a>
                                                        </li>
                                                        {/* <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab" href="#menu2">Accepted / Declined Interests</a>
                                                        </li> */}
                                                    </ul>

                                                    <div className="tab-content">
                                                        {/* Sent Interests */}
                                                        <div id="home" className="container tab-pane fade">
                                                            <br />
                                                            <div className="db-inte-prof-list">
                                                                <ul>
                                                                    {InterestedProfiles.length > 0 ? (
                                                                        InterestedProfiles.map(profile => renderProfile(profile, false))
                                                                    ) : (
                                                                        <p>No interests sent</p>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        {/* Incoming Interests */}
                                                        <div id="menu1" className="container tab-pane active">
                                                            <br />
                                                            <div className="db-inte-prof-list">
                                                                <ul>
                                                                    {IncomingInterests.length > 0 ? (
                                                                        IncomingInterests.map(profile => renderProfile(profile))
                                                                    ) : (
                                                                        <p>No incoming interests</p>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        {/* Accepted / Declined Interests */}
                                                        {/* <div id="menu2" className="container tab-pane fade">
                                                            <br />
                                                            <div className="db-inte-prof-list">
                                                                <ul>
                                                                    {IncomingInterests.length > 0 ? (
                                                                        IncomingInterests.map(profile => renderProfile(profile))
                                                                    ) : (
                                                                        <p>No accepted or declined interests</p>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default UserInterests;
