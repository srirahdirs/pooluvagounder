import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ComingSoon = () => {
    // Set the target date for the countdown
    const targetDate = new Date('Mar 15, 2025 23:59:59').getTime(); // Example future date

    const { user, setUser } = useAuth();

    // Initialize state for the remaining time
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Function to calculate the time difference
        const calculateTimeLeft = () => {
            const now = new Date().getTime(); // Current time in milliseconds
            const difference = targetDate - now; // Time remaining in milliseconds

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                // Time's up, stop the timer
                clearInterval(timerInterval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Update the countdown every second
        const timerInterval = setInterval(calculateTimeLeft, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timerInterval);
    }, [targetDate]);


    if (!user) {
        return <Navigate to="/login" state={{ message: 'Login required' }} replace />;
    }

    const styles = {
        container: {
            textAlign: 'center',
            padding: '50px',
        },
        header: {
            fontSize: '100px',
            color: '#ff6f61',
        },
        message: {
            fontSize: '20px',
            marginBottom: '20px',
        },
        link: {
            fontSize: '18px',
            color: '#007BFF',
            textDecoration: 'none',
        },
    };
    return (
        <>
            <section>
                <div className="login pg-soon">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="tit">
                                    <h4>We are building our website.</h4>
                                    <h1>Coming soon</h1>
                                </div>
                                <div className="menu-pop-soci">
                                    <ul>
                                        <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                        <li><a href="#!"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                        <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                        <li><a href="#!"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                                        <li><a href="#!"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                                <div className="counter">
                                    <div className="timer">
                                        <div>
                                            <span className="days">{timeLeft.days}</span>
                                            <i>Days</i>
                                        </div>
                                        <div>
                                            <span className="hours">{timeLeft.hours}</span>
                                            <i>Hours</i>
                                        </div>
                                        <div>
                                            <span className="minutes">{timeLeft.minutes}</span>
                                            <i>Minutes</i>
                                        </div>
                                        <div>
                                            <span className="seconds">{timeLeft.seconds}</span>
                                            <i>Seconds</i>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/" style={styles.link}>Go Home</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ComingSoon;
