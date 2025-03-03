import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Toast } from "primereact/toast";
import { useToast } from "../assets/utils/toastUtil";
import { jwtDecode } from "jwt-decode";

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
  if (apiUrl) {
    fullApiUrl = apiUrl + "send-otp";
  } else {
    console.error("Invalid API url");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
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
          console.log("OTP has expired. Please request a new OTP.");
          setErrorMessage("OTP has expired. Please request a new OTP.");
          setOtp(Array(6).fill("")); // Clear the OTP input
          return;
        }

        console.log("userEnteredOTP", userEnteredOTP);
        console.log("storedOTP", storedOTP);

        if (userEnteredOTP === storedOTP) {
          setIsLoggedIn(true); // Update login status

          // Parse the user object from sessionStorage
          const storedUser = JSON.parse(sessionStorage.getItem("user"));

          // Store the parsed user object in localStorage
          localStorage.setItem(
            "authToken",
            sessionStorage.getItem("authToken")
          );
          localStorage.setItem("user", JSON.stringify(storedUser)); // Store the user object in localStorage
          setUser(storedUser);
          // Clean up session storage
          // sessionStorage.removeItem('email');
          // sessionStorage.removeItem('decodedOTP');
          // sessionStorage.removeItem('authToken');

          showToast("Valid OTP");
          navigate("/edituserprofile");
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
          setOtp(Array(6).fill("")); // Clear the OTP input
        }
      } catch (error) {
        console.log("Error decoding OTP:", error);
        setErrorMessage("Invalid OTP format.");
        setOtp(Array(6).fill("")); // Clear the OTP input
      }
    } else {
      console.log("No OTP token found. Please request an OTP.");
      setErrorMessage("No OTP token found. Please request an OTP.");
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      const email = sessionStorage.getItem("email");
      try {
        const response = await fetch(fullApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        console.log("Received response from backend", response);

        // Check if the response was successful
        if (response.ok) {
          const result = await response.json();
          console.log(result.message); // Backend response message
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
