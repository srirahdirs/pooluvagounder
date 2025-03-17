import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Toast } from "primereact/toast";
import { useToast } from "../assets/utils/toastUtil";
import { jwtDecode } from "jwt-decode";
import { use } from "react";

const VerifyOtp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize OTP with 6 empty strings
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(true); // Determines if "Resend OTP" button is enabled
  const { toast, showToast } = useToast();

  const apiUrl = config?.apiUrl;
  let fullApiUrl;
  let fullApiUrlUpdateUser;
  if (apiUrl) {
    fullApiUrl = apiUrl + "send-otp";
    fullApiUrlUpdateUser = apiUrl + "updateUser";
  } else {
    console.error("Invalid API url");
  }

  let user = JSON.parse(sessionStorage.getItem("user"));
  if (user === null) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    if (!canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1); // Decrease timer by 1 every second
      }, 1000);

      return () => clearInterval(interval); // Clear interval when the component unmounts or when timer is 0
    }
  }, [timer, canResend]);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    const value = e.target.value.slice(0, 1); // Allow only one character per input
    setErrorMessage("");
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on the next input if the current input is filled
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Handle backspace by moving the focus to the previous input
    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const pastedOtp = e.clipboardData.getData("text").slice(0, 6); // Get the first 6 characters
    const newOtp = pastedOtp.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]); // Fill remaining inputs with empty string if needed
  };

  const handleSubmitOtp = async () => {
    const userEnteredOTP = otp.join(""); // Combine the OTP entered by the user
    const decodedOTPToken = sessionStorage.getItem("decodedOTP"); // Get the token from sessionStorage
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (decodedOTPToken) {
      try {
        // Retrieve and parse the stored OTP from sessionStorage
        const decodedOTP = JSON.parse(sessionStorage.getItem("decodedOTP")); // Parse the JSON string
        if (!decodedOTP) {
          setErrorMessage("No OTP found. Please request a new OTP.");
          return;
        }

        const { otp: storedOTP, exp } = decodedOTP; // Destructure otp and exp
        const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds (for comparison with exp)

        if (currentTime > exp) {
          setErrorMessage("OTP has expired. Please request a new OTP.");
          setOtp(Array(6).fill("")); // Clear the OTP input
          return;
        }


        if (userEnteredOTP === storedOTP) {
          setIsLoggedIn(true); // Update login status
          const updatedUser = { ...user, is_verified: 1 };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          vertifyUser();
          setUser(updatedUser);
          showToast("Valid OTP");

          setTimeout(() => {
            navigate('/edituserprofile');
          }, 3000);
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
          setOtp(Array(6).fill("")); // Clear the OTP input
        }
      } catch (error) {
        setErrorMessage("Invalid OTP format.");
        setOtp(Array(6).fill("")); // Clear the OTP input
      }
    } else {
      setErrorMessage("No OTP token found. Please request an OTP.");
    }
  };
  const vertifyUser = async () => {
    let token = sessionStorage.getItem("authToken");
    if (token === null) {
      token = localStorage.getItem("authToken")
    }
    const payload = {
      token: token,
      is_verified: 1
    };

    try {
      const response = await fetch(fullApiUrlUpdateUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      showToast("Valid OTP");
      navigate("/edituserprofile");

    } catch (error) {
      console.error('Error:', error);
      showToast('An error occurred while updating settings.', 'error');
    }
  }
  const handleResendOtp = async () => {
    if (canResend) {
      let email = sessionStorage.getItem("email");
      if (email === null) {
        email = user?.email;
      }
      console.log(email, 'email')
      try {
        const response = await fetch(fullApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });


        // Check if the response was successful
        if (response.ok) {
          const result = await response.json();
          const decoded = jwtDecode(result.otpToken);
          sessionStorage.setItem("decodedOTP", JSON.stringify(decoded));
          // If OTP was successfully sent
          setTimer(30); // Start 30 seconds countdown for OTP resend
          setCanResend(false); // Disable the "Resend OTP" button
          showToast("OTP sent successfully");
        } else {
          const errorResult = await response.json();
          console.error("Error from backend:", errorResult.message);
          showToast(`Error: ${errorResult.message}`, "error");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        showToast(
          "An error occurred while resending the OTP. Please try again later.",
          "error"
        );
      }
    }
  };

  return (

    <section>
      <Toast ref={toast} />
      <div style={{ margin: "200px" }}></div>
      <div
        className="modal fade show"
        id="sendInter"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header  d-flex justify-content-center">
              <h4 className="modal-title seninter-tit">Email Verification</h4>
            </div>

            {/* Modal Body */}
            <div className="modal-body seninter">
              <p className="otp-tit">Enter the OTP sent to your email:</p>
              <div className="otp-container d-flex justify-content-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    className="otp-input mx-2"
                  />
                ))}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <button
                onClick={handleSubmitOtp}
                className="btn btn-primary w-100 mt-3"
              >
                Submit
              </button>
              <p
                className="otp-resend-message text-center mt-3"
                style={{ color: "black" }}
              >
                Didn't receive the OTP?{" "}
                {canResend ? (
                  <a onClick={handleResendOtp}>Resend OTP</a>
                ) : (
                  <span disabled>Resend OTP in {timer}s</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
