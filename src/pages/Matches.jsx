import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useToast } from '../../src/assets/utils/toastUtil';
const Matches = () => {
    const { isLoggedIn, user } = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { toast, showToast } = useToast();
    const [sentInterests, setSentInterests] = useState([]);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'loggedInSearch';
    } else {
        console.error('Invalid API URL');
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(4); // Display 4 profiles per page

    // Calculate index of the first and last result on the current page
    const indexOfLastProfile = currentPage * resultsPerPage;
    const indexOfFirstProfile = indexOfLastProfile - resultsPerPage;
    const currentProfiles = searchResults.slice(indexOfFirstProfile, indexOfLastProfile);

    // Calculate the total number of pages
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const isPaidUser = user?.premium_user;
    const fetchSentInterests = async () => {
        if (apiUrl) {
            const fullApiUrl = `${apiUrl}getSentInterests/${user?.id}`;
            try {
                const response = await fetch(fullApiUrl);
                const data = await response.json();
                if (response.ok) {
                    setSentInterests(data); // Set the sent interests
                } else {
                    console.error('Failed to fetch sent interests');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    useEffect(() => {
        if (isLoggedIn && user) {
            const fetchData = async () => {
                const token = localStorage.getItem('authToken');
                try {
                    const response = await fetch(fullApiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: token,
                            gender: user.partner_preferences.gender,
                            age: user.partner_preferences.age,
                            religion: user.partner_preferences.religion,
                            city: user.partner_preferences.city
                        }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setSearchResults(result.data || []);  // Update search results
                    } else {
                        console.error('Failed to fetch data');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchData();
        }
    }, [isLoggedIn, user, fullApiUrl]);

    const navigateToPricing = () => {
        navigate('/pricing');
    }
    useEffect(() => {
        fetchSentInterests(); // Fetch sent interests on component mount
    }, []);


    const sendInterest = async (partner_id) => {
        if (apiUrl) {
            fullApiUrl = apiUrl + 'sendInterest';
        } else {
            console.error('Invalid API URL');
        }
        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    partner_id: partner_id,
                    status: 'Requested'
                }),
            });
            if (response.ok) {
                showToast('Interest sent successfully');
                fetchSentInterests(); // Update the sent interests list
            } else if (response.status === 409) {
                showToast('Interest already sent');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <section>
                <Toast ref={toast} />
                <div className="all-pro-head">
                    <div className="container">
                        <div className="row">
                            <h1>Discover Your Perfect Match with Wedding Soul Mates</h1>
                            {user && <a href="/partnerpreferences">Check Your Matches, {user.name}!<i className="fa fa-handshake-o" aria-hidden="true"></i></a>}
                        </div>
                    </div>
                </div>
                <div className="fil-mob fil-mob-act">
                    <h4>Profile filters <i className="fa fa-filter" aria-hidden="true"></i> </h4>
                </div>
            </section>

            <section>
                <div className="all-weddpro all-jobs all-serexp chosenini">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="short-all">
                                    <div className="short-lhs">
                                        <b>{currentProfiles.length}</b> profiles matching
                                    </div>
                                    <div className="short-rhs">
                                        <ul>
                                            <li>
                                                <div className="sort-grid sort-grid-1">
                                                    <i className="fa fa-th-large" aria-hidden="true"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="sort-grid sort-grid-2 act">
                                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="all-list-sh">
                                    <ul>
                                        {currentProfiles.length > 0 ? (
                                            currentProfiles.map((profile, index) => {
                                                const encodedUserId = btoa(profile.user_id.toString()); // Base64 encode user ID
                                                const profileLink = `/profiledetails/${encodeURIComponent(encodedUserId)}`;
                                                const profilePicture = profile.profile_picture || `${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`;
                                                const isInterestSent = sentInterests.some(interest => interest.partner_id === profile.user_id); // Check if interest already sent

                                                // Helper function for handling link click
                                                const handleProfileClick = (e) => {
                                                    if (!isPaidUser) {
                                                        e.preventDefault(); // Prevent navigation if user is not paid
                                                    }
                                                };

                                                // Helper function for chat action
                                                const handleChatAction = (e) => {
                                                    if (!isPaidUser) {
                                                        e.preventDefault(); // Prevent chat action if user is not paid
                                                        navigateToPricing(); // Navigate to pricing page
                                                    }
                                                };

                                                return (
                                                    <li key={profile.user_id || index}>
                                                        <div className={`all-pro-box user-avil-onli ${!isPaidUser ? 'blurred-div' : ''}`} data-useravil="avilyes" data-aviltxt="Available online">
                                                            <div className="pro-img">
                                                                <a href={isPaidUser ? profileLink : '#'} onClick={handleProfileClick}>
                                                                    <img src={profilePicture} alt={profile.name} />
                                                                </a>
                                                                <div className="pro-ave" title="User currently available">
                                                                    <span className="pro-ave-yes"></span>
                                                                </div>
                                                                <div className="pro-avl-status">
                                                                    <h5>Available</h5>
                                                                </div>
                                                            </div>

                                                            <div className="pro-detail">
                                                                <h4>
                                                                    <a href={isPaidUser ? profileLink : '#'} onClick={handleProfileClick}>
                                                                        {profile.name}
                                                                    </a>
                                                                </h4>
                                                                <div className="pro-bio">
                                                                    <span>{profile.degree || 'N/A'}</span>
                                                                    <span>{profile.job_type || 'N/A'}</span>
                                                                    <span>{profile.age} Years old</span>
                                                                    <span>Height: {profile.height || 'N/A'}</span>
                                                                </div>

                                                                <div className="links">
                                                                    {isPaidUser ? (
                                                                        <span className="cta-chat">Chat now</span>
                                                                    ) : (
                                                                        <span className="cta-chat blurred-action" onClick={handleChatAction}>
                                                                            Unlock chat
                                                                        </span>
                                                                    )}

                                                                    <a href={isPaidUser ? profileLink : '#'} onClick={handleProfileClick}>
                                                                        More details
                                                                    </a>

                                                                    {/* Conditionally disable send interest if already sent */}
                                                                    {!isInterestSent ? (
                                                                        <a href="#!" className="cta cta-sendint" onClick={(e) => {
                                                                            e.preventDefault(); // Prevent default behavior
                                                                            sendInterest(profile.user_id); // Send interest
                                                                        }}>
                                                                            Send interest
                                                                        </a>
                                                                    ) : (
                                                                        <span className="cta cta-sendint disabled">
                                                                            <i className="fa fa-check-circle" style={{ color: 'green' }} aria-hidden="true"></i> Interest sent
                                                                        </span>

                                                                    )}
                                                                </div>
                                                            </div>

                                                            <span className="enq-sav" data-toggle="tooltip" title="Interest Sent">
                                                                <i
                                                                    className="fa fa-thumbs-up"
                                                                    aria-hidden="true"
                                                                    style={{ color: isInterestSent ? 'green' : '' }} // Changes color based on isInterestSent
                                                                ></i>
                                                            </span>



                                                            {/* Show subscription message if user is not paid */}
                                                            {!isPaidUser && (
                                                                <div className="buy-now-container">
                                                                    <p className="subscription-message">
                                                                        Choose a subscription plan to unlock full profiles and connect with your ideal match today
                                                                    </p>
                                                                    <button className="buy-now-btn" onClick={navigateToPricing}>
                                                                        Purchase Plan
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <p>No profiles found</p>
                                        )}
                                    </ul>

                                </div>
                            </div>
                            {/* Pagination */}
                            <div className="pagination-container">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || searchResults.length === 0}
                                >
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || searchResults.length === 0}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section >

        </>
    );
};

export default Matches;