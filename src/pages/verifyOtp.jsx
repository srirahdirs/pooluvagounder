import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

const VerifyOtp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize OTP with 6 empty strings
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(true); // Determines if "Resend OTP" button is enabled

  useEffect(() => {
    // Retrieve email from session storage
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      console.log(`Email: ${email}`);
    }

    // If timer is 0, enable the "Resend OTP" button
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
    const pastedOtp = e.clipboardData.getData("text").slice(0, 6); // Get the first 6 characters
    const newOtp = pastedOtp.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]); // Fill remaining inputs with empty string if needed
  };

  // Handle OTP Submission
  const handleSubmitOtp = async () => {
    const otpValue = otp.join("");
    const testOtp = "123456"; // Set OTP here for testing
    if (otpValue === testOtp) {
      console.log(`OTP Submitted: ${otpValue}`);
      console.log("OTP is correct");
      alert("OTP is correct");
      navigate("/edituserprofile");
    } else {
      console.log("Invalid OTP. Please try again.");
      setErrorMessage("Invalid OTP. Please try again.");
      setOtp(Array(6).fill("")); // Reset OTP fields
    }

  
  };

  const handleResendOtp = () => {
    if (canResend) {
      console.log("OTP has been resent!");
      setTimer(30);
      setCanResend(false); // Disable the "Resend OTP" button
    } else {
      alert("You can resend OTP after 30 seconds.");
    }
  };

  return (
    <section>
      <div style={{ margin: "200px" }}></div>
      <div>
        <Dialog
          className="custom-dialog otp-dialog"
          visible={true}
          header="Email Verification"
          closable={false}
        >
          <div className="card">
            <div className="modal-content">
              <p className="otp-tit">Enter the OTP sent to your email:</p>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    className="otp-input"
                  />
                ))}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <button onClick={handleSubmitOtp}>Submit</button>
              <p className="otp-resend-message">
                Didn't receive the OTP?{" "}
                {canResend ? (
                  <a onClick={handleResendOtp}>Resend OTP</a>
                ) : (
                  <span disabled>Resend OTP in {timer}s</span>
                )}
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default VerifyOtp;
