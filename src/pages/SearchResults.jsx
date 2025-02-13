import React from 'react'
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import SearchProfile from './SearchProfile';

const SearchResults = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];
    const navigateToPricing = () => {
        navigate('/pricing');
    }
    return (
        <>
            <section>
                <div className="all-pro-head">
                    <div className="container">
                        <div className="row">
                            <h1>Find Your Forever with Wedding Soul Mates</h1>
                            {isLoggedIn
                                ? (<a href="#" className='disabled-link'>Start Searching for Your Soulmate, {user.name}!<i className="fa fa-handshake-o" aria-hidden="true"></i></a>)
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
                                <div className="short-all">
                                    <div className="short-lhs">
                                        Showing <b>{searchResults.length}</b> profiles
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
                                        {searchResults.length > 0 ? (
                                            searchResults.map((profile, index) => (
                                                <li key={profile.user_id || index}>
                                                    <div className="all-pro-box user-avil-onli blurred-div" data-useravil="avilyes" data-aviltxt="Available online">
                                                        <div className="pro-img">
                                                            {profile.profile_picture ? (
                                                                <a href={`/profiledetails/${profile.user_id}`}>
                                                                    <img src={profile.profile_picture} alt={profile.name} />
                                                                </a>
                                                            ) : (
                                                                <a href={`/profiledetails/${profile.user_id}`}>
                                                                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/user.png`} alt={profile.name} />
                                                                </a>
                                                            )}
                                                            <div className="pro-ave" title="User currently available">
                                                                <span className="pro-ave-yes"></span>
                                                            </div>
                                                            <div className="pro-avl-status">
                                                                <h5>Available</h5>
                                                            </div>
                                                        </div>

                                                        <div className="pro-detail">
                                                            <h4><a href={`/profiledetails/${profile.user_id}`}>{profile.name}</a></h4>
                                                            <div className="pro-bio">
                                                                <span>{profile.degree || 'N/A'}</span>
                                                                <span>{profile.job_type || 'N/A'}</span>
                                                                <span>{profile.age} Years old</span>
                                                                <span>Height: {profile.height || 'N/A'} </span>
                                                            </div>
                                                            <div className="links">
                                                                <span className="cta-chat">Chat now</span>
                                                                <a href={`/profiledetails/${profile.user_id}`}>More details</a>
                                                            </div>
                                                        </div>

                                                        <span className="enq-sav" data-toggle="tooltip" title="Click to save this profile.">
                                                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                                        </span>

                                                        {/* Buy Now button */}
                                                        <div className="buy-now-container">
                                                            <p className="subscription-message">Choose a subscription plan to unlock full profiles and connect with your ideal match today</p>
                                                            <button className="buy-now-btn" onClick={navigateToPricing}>Purchase Plan</button>
                                                        </div>

                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p>No profiles found</p>
                                        )}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchResults;
