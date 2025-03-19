import React, { useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useToast } from "../assets/utils/toastUtil";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Extract the token from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      showToast("Invalid or expired reset link.", "error");
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [token, navigate, showToast]);

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (loading || passwordError || confirmPasswordError) return; // Prevent submission if there are errors or loading

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.weddingsoulmates.com/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showToast("Password reset successful! Please login with your new password.", "success");
        
        console.log('login with your new password');
      } else {
        showToast(data.message || "Failed to reset password.", "error");
      }
    } catch (error) {
      showToast("Something went wrong, please try again.", "error");
    } finally {
      setLoading(false);
      navigate("/logout"); // Redirect to login after successful password reset
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
        style={{ display: "block" }} // Ensure the modal is visible when open
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content password-reset-modal">
            {/* Modal Header */}
            <div className="modal-header d-flex justify-content-center">
              <h4 className="modal-title seninter-tit">Reset Password</h4>
            </div>

            {/* Modal Body */}
            <div className="modal-body seninter">
              <div className="form-group d-flex align-items-center">
                <label className="lb mr-2" htmlFor="pwd">
                  Password:
                </label>
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
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}

              <div className="form-group d-flex align-items-center">
                <label className="lb mr-2" htmlFor="confirmPwd">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPwd"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => validateConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading} // Disable the button when loading
                onClick={handleResetPassword}
              >
                {loading ? (
                  <div className="loader">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

