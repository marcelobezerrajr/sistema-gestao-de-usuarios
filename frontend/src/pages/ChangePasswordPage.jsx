import React, { useState } from "react";
import { Card, Form, Spinner, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import useChangePassword from "../hooks/useChangePassword";
import "../styles/change-password-page.css";

const ChangePassword = () => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    loading,
    message,
    showPasswords,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
    togglePasswordVisibility,
  } = useChangePassword();

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validatePassword(newPassword);
    const confirmError = validateConfirmPassword(newPassword, confirmPassword);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    if (confirmError) {
      setConfirmPasswordError(confirmError);
      return;
    }

    setPasswordError("");
    setConfirmPasswordError("");
    handleChangePassword();
  };

  return (
    <MainLayout>
      <div className="change-password">
        <div className="change-password-container">
          <Card className="change-password-card">
            <Card.Header className="change-password-card-header">
              <h4>Change password</h4>
            </Card.Header>
            <Card.Body className="change-password-card-body">
              {error && <div className="change-password-error">{error}</div>}
              {passwordError && (
                <div className="change-password-error">{passwordError}</div>
              )}
              {message && (
                <div className="change-password-success">{message}</div>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="change-password-form-label">
                    Current Password
                  </Form.Label>
                  <div className="change-password-password-container">
                    <Form.Control
                      type={showPasswords.currentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="change-password-form-control"
                    />
                    <button
                      type="button"
                      className="change-password-password-toggle"
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                    >
                      {showPasswords.currentPassword ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </button>
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="change-password-form-label">
                    New Password
                  </Form.Label>
                  <div className="change-password-password-container">
                    <Form.Control
                      type={showPasswords.newPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError(validatePassword(e.target.value));
                      }}
                      className="change-password-form-control"
                    />
                    <button
                      type="button"
                      className="change-password-password-toggle"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      {showPasswords.newPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="change-password-form-label">
                    Confirm Password
                  </Form.Label>
                  <div className="change-password-password-container">
                    <Form.Control
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordError(
                          validateConfirmPassword(newPassword, e.target.value)
                        );
                      }}
                      className="change-password-form-control"
                    />
                    <button
                      type="button"
                      className="change-password-password-toggle"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showPasswords.confirmPassword ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </button>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="change-password-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Changing...</span>
                    </>
                  ) : (
                    "Change password"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
