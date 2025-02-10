import React, { useState } from "react";
import { Form, Card, Alert, Spinner, Button } from "react-bootstrap";
import useRequestPassword from "../hooks/useRequestPassword";
import logo from "../assets/logo_marcelo_developer.png";
import "../styles/request-password-page.css";

const RequestPasswordPage = () => {
  const { requestPassword, loading, error, successMessage } =
    useRequestPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPassword(email);
  };

  return (
    <div className="request">
      <div className="request-container">
        <div className="logo">
          <img src={logo} alt="Logo Marcelo Developer" />
        </div>
        <Card className="request-card">
          <Card.Header className="request-card-header">
            <h4>Recover Password</h4>
          </Card.Header>
          <Card.Body className="request-card-body">
            {error && (
              <Alert className="request-alert-error" variant="danger">
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert className="request-alert-success" variant="success">
                {successMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="request-form-label">Email</Form.Label>
                <div className="request-email-container">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="request-form-control"
                    required
                  />
                </div>
                <div className="request-back-login">
                  <a href="/login">Go to Login</a>
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="request-button"
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
                    <span className="visually-hidden">Sending...</span>
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RequestPasswordPage;
