import React, { useState, useEffect } from 'react';
import { useToast } from '../assets/utils/toastUtil';
import { useNavigate, Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import config from '../config';
import { jwtDecode } from 'jwt-decode';
import '../assets/css/Registration.css';
const Registration = () => {
    const { toast, showToast } = useToast();
    const navigate = useNavigate();

    const apiUrl = config?.apiUrl;
    let fullApiUrl;
    if (apiUrl) {
        fullApiUrl = apiUrl + 'register';
    } else {
        console.error('Invalid API url');
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Validation error states
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Check for session token on mount
    useEffect(() => {
        const sessionToken = localStorage.getItem('authToken');
        if (sessionToken) {
            showToast('Already logged in. Redirecting...');
            setTimeout(() => {
                navigate('/home'); // Redirect to home page
                window.location.reload();
            }, 3000);
        }
    }, []);

    // Validation handlers
    const validateName = (value) => {
        setName(value);
        if (value.trim() === '') {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validatePhone = (value) => {
        const phoneNumber = value.replace(/\D/g, ""); // Remove non-numeric characters.

        setPhone(value);

        if (phoneNumber.length !== 10) {
            setPhoneError("Phone number must be 10 digits.");
        } else {
            setPhoneError("");
        }
    };



    const validatePassword = (value) => {
        setPassword(value);
        if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Final check before submission
        if (nameError || emailError || phoneError || passwordError || confirmPasswordError) {
            showToast('Please correct the errors before submitting', 'error');
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch(fullApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            });


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend Error:', errorData);
                showToast(errorData.message || 'Registration failed', 'error');
                return;
            }

            const data = await response.json();

            if (data.success) {
                showToast('Registration successful.');

                // Decode the OTP token
                const decoded = jwtDecode(data.otpToken);

                sessionStorage.setItem('authToken', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user)); // Stringify user object
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('decodedOTP', JSON.stringify(decoded)); // Store decoded OTP

                // Redirect after a short delay
                setTimeout(() => {
                    navigate('/Verifyotp');
                }, 1000);
            } else {
                showToast(data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            showToast('Something went wrong, please try again.', 'error');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <section>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="lhs">
                                    <div className="tit">
                                        <h2>Now <b>Find your life partner</b> Easy and fast.</h2>
                                    </div>
                                    <div className="im">
                                        <img src={`${process.env.PUBLIC_URL}/matrimo/images/login-couple.png`} alt="" />
                                    </div>
                                    <div className="log-bg">&nbsp;</div>
                                </div>
                                <div className="rhs">
                                    <div>
                                        <div className="form-tit">
                                            <h4>Get Started for Free</h4>
                                            <h1>Join <em className="em_register">Wedding Soul Mates</em> Today</h1>
                                            <p>Already a member? <Link to="/login" className="font-medium text-blue-500">Log In</Link></p>
                                        </div>
                                        <div className="form-login">
                                            <form onSubmit={handleRegister}>
                                                <div className="form-group">
                                                    <label className="lb" htmlFor="name">Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Applicant full name"
                                                        name="name"
                                                        id="name"
                                                        value={name}
                                                        onChange={(e) => validateName(e.target.value)}
                                                        required
                                                    />
                                                    {nameError && <p className="error-message">{nameError}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="lb" htmlFor="email">Email:</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => validateEmail(e.target.value)}
                                                        required
                                                    />
                                                    {emailError && <p className="error-message">{emailError}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="lb" htmlFor="phone">Phone:</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Enter phone number"
                                                        name="phone"
                                                        value={phone}
                                                        onChange={(e) => validatePhone(e.target.value)}
                                                        required
                                                    />
                                                    {phoneError && <p className="error-message">{phoneError}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="lb" htmlFor="pwd">Password:</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="pwd"
                                                        placeholder="Enter password"
                                                        name="pswd"
                                                        value={password}
                                                        onChange={(e) => validatePassword(e.target.value)}
                                                        required
                                                    />
                                                    {passwordError && <p className="error-message">{passwordError}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="lb" htmlFor="confirmPwd">Confirm Password:</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="confirmPwd"
                                                        placeholder="Confirm password"
                                                        value={confirmPassword}
                                                        onChange={(e) => validateConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                                                </div>
                                                <div className="form-group form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="agree"
                                                            required
                                                            onInvalid={(e) => e.target.setCustomValidity("You must agree to the terms of service before creating an account.")}
                                                            onInput={(e) => e.target.setCustomValidity("")} // Reset the custom message on input
                                                        />{' '}
                                                        Creating an account means you're okay with our
                                                        <a href="/termsconditions" target='_blank' rel="noopener"> Terms of Service</a>,
                                                        Privacy Policy, and our default Notification Settings.
                                                    </label>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={loading} // Disable the button when loading
                                                >
                                                    {loading ? (
                                                        <div className="loader">
                                                            <span className="dot">.</span>
                                                            <span className="dot">.</span>
                                                            <span className="dot">.</span>
                                                        </div>
                                                    ) : (
                                                        'Create Account'
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Registration;