import React, { useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useToast } from '../assets/utils/toastUtil';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import the correct AuthContext
import config from '../../src/config';
import SEO from '../components/SEO';

const Login = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [otpSent, setOtpSent] = useState(false); // New state to manage OTP sending
  const [otp, setOtp] = useState(''); // State to store the OTP input
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const { setUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const apiUrl = config?.apiUrl;
  let fullApiUrl;
  if (apiUrl) {
    fullApiUrl = apiUrl + 'login';
  } else {
    console.error('Invalid API url');
  }

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate('/edituserprofile');
      }, 1000);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show preloader
    try {
      const response = await fetch(fullApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast(errorData.message || 'Login failed', 'error');
        setLoading(false); // Hide preloader on error
        return;
      }
      const data = await response.json();

      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        setIsLoggedIn(true);  // Update login status
        setUser(data.user);
        showToast(data.message);
      } else {
        showToast(data.message || 'Invalid credentials', 'error');
      }
    } catch (error) {
      showToast('Something went wrong, please try again.');
    } finally {
      setLoading(false);  // Hide preloader after the login process finishes
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

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  // Function to show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to hide modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  // Function for forgot password
  const forgotPassword = async (e) => {
    e.preventDefault();  // Prevent form from reloading
    setLoading(true); // Show loading indicator
    try {
      const response = await fetch('https://api.weddingsoulmates.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log(response, "response")

      const data = await response.json();
      console.log(data, "data")
      if (data.success) {
        showToast('Password reset link sent to your email', 'success');
        // setOtpSent(true); // Show OTP form if needed (or a success message)
        hideModal(); // Close modal after success
      } else {
        showToast(data.message || 'Error sending reset link', 'error');
        console.log(data.message)
      }
    } catch (error) {
      showToast('Something went wrong, please try again.', 'error');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://weddingsoulmates.com' : 'http://localhost:3000';

  // Structured data for Login page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Login to WeddingSoulMates - Access Your Matrimony Account",
    "description": "Sign in to your WeddingSoulMates matrimony account. Access your profile, view matches, and continue your journey to find your perfect life partner.",
    "url": `${baseUrl}/login`,
    "mainEntity": {
      "@type": "Service",
      "name": "Matrimony Account Access",
      "description": "Secure login to access matrimonial services and find your perfect life partner",
      "provider": {
        "@type": "Organization",
        "name": "WeddingSoulMates"
      },
      "serviceType": "Matrimonial Account Management"
    }
  };

  return (
    <>
      <SEO
        title="Login to WeddingSoulMates - Access Your Matrimony Account | Sign In"
        description="Sign in to your WeddingSoulMates matrimony account. Access your profile, view matches, and continue your journey to find your perfect life partner. Secure login for all communities."
        keywords="matrimony login, marriage bureau login, matrimonial account access, wedding soul mates login, matrimony sign in, marriage website login, matrimonial platform access, bride groom login, matrimony account login, marriage service login, shaadi login, muslim matrimony login, hindu matrimony login, christian matrimony login, sikh matrimony login, gounder matrimony login, chettiar matrimony login, brahmin matrimony login, vellalar matrimony login, naidu matrimony login, reddy matrimony login, patel matrimony login, gujarati matrimony login, marathi matrimony login, bengali matrimony login, punjabi matrimony login, tamil matrimony login, telugu matrimony login, malayalam matrimony login, kannada matrimony login, hindi matrimony login, inter caste marriage login, inter religion marriage login, all community matrimony login, india matrimony login, south indian matrimony login, north indian matrimony login, east indian matrimony login, west indian matrimony login"
        image={`${baseUrl}/matrimo/images/og-image.png`}
        url={`${baseUrl}/login`}
        canonical={`${baseUrl}/login`}
        schema={schemaData}
        type="website"
      />
      <Toast ref={toast} />
      <div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="modal fade show"
            id="sendInter"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered custom-modal-width ">
              <div className="modal-content position-relative password-reset-modal">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title seninter-tit">Reset Password</h4>
                  <a
                    href="#"
                    type="button"
                    className="btn-close text-danger"
                    aria-label="Close"
                    onClick={hideModal} // Close modal when clicked
                  />
                </div>

                {/* Modal Body */}
                <form onSubmit={forgotPassword}>
                  <div className="modal-body seninter">
                    <div className="form-group">
                      <p>Please enter your registered email</p>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        placeholder="Enter email"
                        name="email"
                        required
                      />
                    </div>
                    {emailError && <p className="error-message">{emailError}</p>}
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
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>

      <section>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now <b>Find <br /> your life partner</b> Easy and fast.
                    </h2>
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
                      <h1>Signin <em className="em_register">Wedding Soul Mates</em> Matrimony</h1>
                      <p>Not a member yet? <a href="/register">Create an account now</a></p>
                    </div>
                    <div className="form-login">
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="Enter email"
                            name="email"
                            required
                          />
                        </div>
                        {emailError && <p className="error-message">{emailError}</p>}

                        <div className="form-group">
                          <label className="lb">Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            placeholder="Enter password"
                            name="pswd"
                            required
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                          />
                        </div>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="agree" /> Remember me
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mb-4"
                          disabled={loading} // Disable the button when loading
                        >
                          {loading ? (
                            <div className="loader">
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                            </div>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                        <a onClick={showModal} className="text-start p-2 cursor-pointer">Forgot password?</a>

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

export default Login;

