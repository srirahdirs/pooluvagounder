import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from "react-router-dom";

const UserLeftMenu = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [userProfileEditRequired, setUserProfileEditRequired] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        // Set the profile picture if it's available
        if (user && user.user_profile_picture) {
            setProfilePicture(user.user_profile_picture);
        }

        // Check user_gender to determine if profile edit is required
        if (user?.user_details?.gender !== null && user?.user_details?.gender !== undefined) {
            setUserProfileEditRequired(false);
        }
    }, [user]);

    return (
        <div className="db-nav">
            <div className="db-nav-pro">
                {user?.user_profile_picture ? (
                    <img
                        src={`${profilePicture}`}
                        loading="lazy"
                        alt="Profile picture"
                        className='image-fluid'
                    />
                ) : (
                    // Display default image if no profile picture is available
                    <img
                        src={`${process.env.PUBLIC_URL}/matrimo/images/icon/users.svg`}
                        loading="lazy"
                        alt="Default profile"
                        className='image-fluid'
                    />
                )}
            </div>
            <div className="db-nav-list">
                <ul>

                    <li>
                        <Link to="/userprofile" className={location.pathname === '/userprofile' ? 'active' : ''}>
                            <i className="fa fa-male" aria-hidden="true"></i>Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/edituserprofile" className={location.pathname === '/edituserprofile' ? 'active' : ''}>
                            <i className="fa fa-cog" aria-hidden="true"></i>Edit profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/partnerpreferences" state={{ dataExists: userProfileEditRequired }} className={location.pathname === '/partnerpreferences' ? 'active' : ''}>
                            <i className="fa fa-handshake-o" aria-hidden="true"></i>Partner Preferences {userProfileEditRequired}
                        </Link>
                    </li>
                    <li>
                        <Link to="/userinterests" className={location.pathname === '/userinterests' ? 'active' : ''}>
                            <i className="fa fa-heart" aria-hidden="true"></i>Interests
                        </Link>
                    </li>
                    <li>
                        <Link to="/userhoroscope" className={location.pathname === '/userhoroscope' ? 'active' : ''}>
                            {/* <i className="fa fa-star" aria-hidden="true"></i> */}
                            <i className="fa fa-bullseye" aria-hidden="true"></i>
                            Horoscope
                        </Link>
                    </li>
                    <li>
                        <Link to="/comingsoon" className={location.pathname === '/comingsoon' ? 'active' : ''}>
                            <i className="fa fa-commenting-o" aria-hidden="true"></i>Chat list
                        </Link>
                    </li>
                    <li>
                        <Link to="/premiumuserbenefits" className={location.pathname === '/premiumuserbenefits' ? 'active' : ''}>
                            <i className="fa fa-diamond" aria-hidden="true"></i>
                            Premium User Benefits
                        </Link>
                    </li>
                    <li>
                        <Link to="/userplan" className={location.pathname === '/userplan' ? 'active' : ''}>
                            <i className="fa fa-money" aria-hidden="true"></i>Plan
                        </Link>
                    </li>

                    <li>
                        <Link to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>Log out
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default UserLeftMenu;
