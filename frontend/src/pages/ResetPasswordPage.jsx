import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Alert, Spinner, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useResetPassword from "../hooks/useResetPassword";
import logo from "../assets/logo_marcelo_developer.png";
import "../styles/reset-password-page.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [validationError, setValidationError] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("access_token");
  const navigate = useNavigate();
  const { feedback, loading, verifyToken, handleResetPassword } =
    useResetPassword();

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      navigate("/invalid-token");
    }
  }, [token]);

  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/\d/.test(password))
      return "The password must contain at least one digit.";
    if (!/[A-Z]/.test(password))
      return "The password should contain at least 1 uppercase character.";
    if (!/[a-z]/.test(password))
      return "The password must contain at least one lowercase letter.";
    if (!/[!@#$%^&*()-_=+[\]{};:'\",<.>/?\\|`~]/.test(password))
      return "The password must contain at least one special character.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    const validationError = validatePassword(newPassword);
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    handleResetPassword(token, newPassword);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="reset">
      <div className="reset-container">
        <div className="logo">
          <img src={logo} alt="Logo Marcelo Developer" />
        </div>
        <Card className="reset-card">
          <Card.Header className="reset-card-header">
            <h4>Reset password</h4>
          </Card.Header>
          <Card.Body className="reset-card-body">
            {feedback.message && (
              <Alert
                className="reset-alert-error"
                variant={feedback.error ? "danger" : "success"}
              >
                {feedback.message}
              </Alert>
            )}
            {validationError && (
              <Alert variant="danger" className="reset-alert-error">
                {validationError}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="reset-form-label">
                  New Password
                </Form.Label>
                <div className="reset-password-container">
                  <Form.Control
                    type={showPasswords.newPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                    className="reset-form-control"
                  />
                  <Button
                    variant="link"
                    className="reset-password-toggle"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPasswords.newPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label className="reset-form-label">
                  Confirm Password
                </Form.Label>
                <div className="reset-password-container">
                  <Form.Control
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="reset-form-control"
                  />
                  <Button
                    variant="link"
                    className="reset-password-toggle"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPasswords.confirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
                <div className="reset-back-login">
                  <a href="/login">Go to Login</a>
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="reset-button"
                disabled={loading || !newPassword || !confirmPassword}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Sending...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
