import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import config from '../config';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const Matches = () => {
    const { isLoggedIn, user } = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // Redirect to login if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'search';
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
    console.log(isPaidUser, 'sss');

    const secretKey = config?.cryptoSecretKey;
    useEffect(() => {
        if (isLoggedIn && user) {
            const fetchData = async () => {
                try {
                    const response = await fetch(fullApiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
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
    return (
        <>
            <section>
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
                                        Showing <b>{currentProfiles.length}</b> profiles
                                    </div>
                                    <div className="short-rhs">
                                        <ul>
                                            <li>Sort by:</li>
                                            <li>
                                                <div className="form-group">
                                                    <select className="chosen-select">
                                                        <option value="">Most relative</option>
                                                        <option value="newest">Date listed: Newest</option>
                                                        <option value="oldest">Date listed: Oldest</option>
                                                    </select>
                                                </div>
                                            </li>
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

                                                const encryptedUserId = CryptoJS.AES.encrypt(profile.user_id.toString(), secretKey).toString();
                                                // Replace with actual logic to check if the user is paid

                                                const profileLink = `/profiledetails/${encodeURIComponent(encryptedUserId)}`;
                                                const profilePicture = profile.profile_picture || `${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`;

                                                // Helper function to handle profile link click
                                                const handleProfileClick = (e) => {
                                                    if (!isPaidUser) {
                                                        e.preventDefault();
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
                                                                        <span className="cta-chat blurred-action" onClick={navigateToPricing}>
                                                                            Unlock chat
                                                                        </span>
                                                                    )}
                                                                    <a href={isPaidUser ? profileLink : '#'} onClick={handleProfileClick}>
                                                                        More details
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <span className="enq-sav" data-toggle="tooltip" title="Click to save this profile.">
                                                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                                            </span>

                                                            {!isPaidUser ? (
                                                                <div className="buy-now-container">
                                                                    <p className="subscription-message">
                                                                        Choose a subscription plan to unlock full profiles and connect with your ideal match today
                                                                    </p>
                                                                    <button className="buy-now-btn" onClick={navigateToPricing}>
                                                                        Purchase Plan
                                                                    </button>
                                                                </div>
                                                            ) : ''}
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
            </section>
        </>
    );
};

export default Matches;
