import React from "react";
import TopMenu from './TopMenu';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { useAuth } from '../../../context/AuthContext';
const MainMenu = () => {
    const { isLoggedIn, user } = useAuth();
    const handleClick = () => {
        console.log('clicked');
        const popBgElement = document.querySelector('.pop-bg');
        if (popBgElement) {
            popBgElement.classList.add('act');
        }
        const menu_pop2 = document.querySelector('.menu-pop2');
        if (menu_pop2) {
            menu_pop2.classList.add('act');
        }
    };

    return (
        <>
            <TopMenu />
            <LeftMenu />
            <RightMenu />
            <div className="hom-top">
                <div className="container">
                    <div className="row">
                        <div className="hom-nav">
                            {/* LOGO */}
                            <div className="logo">
                                {/* <span className="menu desk-menu">
                                    <i></i><i></i><i></i>
                                </span> */}
                                <a href="/home" className="logo-brand">
                                    <img src={`${process.env.PUBLIC_URL}/matrimo/images/WeddingSoulMates.png`} alt="" loading="lazy" className="ic-logo" />
                                </a>
                            </div>

                            {/* EXPLORE MENU */}

                            <div className="bl">
                                <ul>
                                    <li><a href="/home">Home</a></li>
                                    <li><a href="/allprofiles">Profiles</a></li>
                                    <li><a href="/pricing">Pricing</a></li>
                                    <li><a href="/about">About Us</a></li>
                                    {isLoggedIn ? (
                                        <>
                                            <li><a href="/matches">Matches</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><a href="/login">Login</a></li>
                                            <li><a href="/register">Register</a></li>

                                        </>
                                    )
                                    }
                                    <li><a href="/contact">Contact Us</a></li>
                                </ul>
                            </div>


                            {/* USER PROFILE */}
                            {isLoggedIn ? (
                                <div className="al">
                                    <div className="head-pro">
                                        {isLoggedIn && user.user_profile_picture ? (
                                            <>
                                                <img src={`${user.user_profile_picture}`} alt="" loading="lazy" />

                                            </>
                                        ) : (
                                            <img src={`${process.env.PUBLIC_URL}/matrimo/images/user_dummy.png`} alt="" loading="lazy" />
                                        )}
                                        <b>My Profile</b><br />
                                        <h4>{user?.name}</h4>  {/* Use optional chaining to avoid errors */}
                                        <span onClick={handleClick} className="fclick"></span>
                                    </div>
                                </div>
                            ) : ''}
                            {/* MOBILE MENU */}
                            <div className="mob-menu">
                                <div className="mob-me-ic">

                                    <span className="mobile-menu" data-mob="mobile">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/icon/menu.svg`} alt="" />
                                    </span>
                                </div>
                            </div>
                            {/* END MOBILE MENU */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainMenu;
