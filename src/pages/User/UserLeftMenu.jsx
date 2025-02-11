import { React, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'
import { useState } from "react";

const UserLeftMenu = () => {
    const { user } = useAuth();
    const [profilePicture, setProfilePicture] = useState(null);
    useEffect(() => {
        if (user && user.user_images && user.user_images.length > 0) {
            if (user && user.user_profile_picture) {
                setProfilePicture(user.user_profile_picture);
            }
        }
    }, [user]);
    return (
        <div className="db-nav">
            <div className="db-nav-pro">
                {profilePicture ? (
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
                        <a href="/home">
                            <i className="fa fa-tachometer" aria-hidden="true"></i>Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/edituserprofile" className="act">
                            <i className="fa fa-male" aria-hidden="true"></i>Profile
                        </a>
                    </li>
                    <li>
                        <a href="/partnerpreferences">
                            <i className="fa fa-handshake-o" aria-hidden="true"></i>Partner Preferences
                        </a>
                    </li>
                    <li>
                        <a href="user-chat.html">
                            <i className="fa fa-commenting-o" aria-hidden="true"></i>Chat list
                        </a>
                    </li>
                    <li>
                        <a href="/userplan">
                            <i className="fa fa-money" aria-hidden="true"></i>Plan
                        </a>
                    </li>
                    <li>
                        <a href="/edituserprofile">
                            <i className="fa fa-cog" aria-hidden="true"></i>Edit profile
                        </a>
                    </li>
                    <li>
                        <a href="/logout">
                            <i className="fa fa-sign-out" aria-hidden="true"></i>Log out
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default UserLeftMenu;
