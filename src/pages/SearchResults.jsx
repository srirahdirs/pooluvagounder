
import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import SearchProfile from './SearchProfile';
import config from '../config';
import CryptoJS from 'crypto-js';
import SEO from '../components/SEO';

const SearchResults = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

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
    const secretKey = config?.cryptoSecretKey;
    const isPaidUser = user?.premium_user;

    // Navigate to pricing page
    const navigateToPricing = () => {
        navigate('/pricing');
    };

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://weddingsoulmates.com' : 'http://localhost:3000';

    // Structured data for Search Results page
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": "Matrimony Search Results - Find Your Perfect Match",
        "description": "Browse through verified matrimony profiles and find your perfect life partner. Search results for all communities, religions, and castes across India.",
        "url": `${baseUrl}/search`,
        "mainEntity": {
            "@type": "ItemList",
            "name": "Matrimony Profiles",
            "description": "Verified matrimony profiles for finding life partners",
            "numberOfItems": searchResults.length,
            "itemListElement": searchResults.slice(0, 10).map((profile, index) => ({
                "@type": "Person",
                "name": profile.name,
                "age": profile.age,
                "jobTitle": profile.job_type,
                "description": `${profile.degree || 'N/A'} - ${profile.job_type || 'N/A'}`,
                "url": `${baseUrl}/profiledetails/${btoa(profile.user_id.toString())}`
            }))
        }
    };

    return (
        <>
            <SEO
                title="Matrimony Search Results - Find Your Perfect Match | WeddingSoulMates"
                description="Browse through verified matrimony profiles and find your perfect life partner. Search results for all communities, religions, and castes across India. Start your journey today!"
                keywords="matrimony search results, marriage bureau search, matrimonial profiles, wedding soul mates search, matrimony browse profiles, marriage website search, matrimonial platform search, bride groom search, matrimony find partner, marriage service search, shaadi search results, muslim matrimony search, hindu matrimony search, christian matrimony search, sikh matrimony search, gounder matrimony search, chettiar matrimony search, brahmin matrimony search, vellalar matrimony search, naidu matrimony search, reddy matrimony search, patel matrimony search, gujarati matrimony search, marathi matrimony search, bengali matrimony search, punjabi matrimony search, tamil matrimony search, telugu matrimony search, malayalam matrimony search, kannada matrimony search, hindi matrimony search, inter caste marriage search, inter religion marriage search, all community matrimony search, india matrimony search, south indian matrimony search, north indian matrimony search, east indian matrimony search, west indian matrimony search"
                image={`${baseUrl}/matrimo/images/og-image.png`}
                url={`${baseUrl}/search`}
                canonical={`${baseUrl}/search`}
                schema={schemaData}
                type="website"
            />
            <section>
                <div className="all-pro-head">
                    <div className="container">
                        <div className="row">
                            <h1>Find Your Forever with Wedding Soul Mates</h1>
                            {isLoggedIn
                                ? (<a href="#" className='disabled-link'>Start Searching for Your Soulmate, {user?.name}!<i className="fa fa-handshake-o" aria-hidden="true"></i></a>)
                                : (<a href="/register">Join now for Free <i className="fa fa-handshake-o" aria-hidden="true"></i></a>)
                            }
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
                            <SearchProfile />
                            <div className="col-md-9">
                                <div className="short-all" style={{ paddingLeft: '0px' }}>
                                    <div className="short-lhs">
                                        Showing <b>{currentProfiles.length}</b> profiles
                                    </div>
                                    <div className="short-rhs">
                                        <ul>
                                            {/* <li>Sort by:</li>
                                            <li>
                                                <div className="form-group">
                                                    <select className="chosen-select">
                                                        <option value="">Most relative</option>
                                                        <option value="newest">Date listed: Newest</option>
                                                        <option value="oldest">Date listed: Oldest</option>
                                                    </select>
                                                </div>
                                            </li> */}
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
                                                const encodedUserId = btoa(profile.user_id.toString());
                                                const profileLink = `/profiledetails/${encodeURIComponent(encodedUserId)}`;
                                                const profilePicture = profile.profile_picture || `${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`;
                                                // Handle profile link click
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

                                                            {/* <span className="enq-sav" data-toggle="tooltip" title="Click to save this profile.">
                                                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                                            </span> */}

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
                                            <p>No profiles found. Try adjusting your filters to find the perfect match<i className="fa fa-arrow-left"></i></p>

                                        )}
                                    </ul>
                                </div>
                            </div>
                            {/* Pagination */}
                            {searchResults.length > 0 && (
                                <div className="pagination-container">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchResults;

