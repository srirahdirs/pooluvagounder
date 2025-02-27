import { React, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserLeftMenu = () => {
    const location = useLocation();
    // const { user } = useAuth();
    const [userProfileEditRequired, setUserProfileEditRequired] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const { user, setUser } = useAuth();

    useEffect(() => {

        if (user?.user_profile_picture && user?.user_profile_picture !== '') {
            setProfilePicture(user?.user_profile_picture);
        }


        if (user?.user_gender === null) {
            setUserProfileEditRequired(true);
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
                            <i className="fa fa-handshake-o" aria-hidden="true"></i>Partner Preferences
                        </Link>
                    </li>
                    <li>
                        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>Interests
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
