import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/invalid-token-page.css";

const InvalidTokenPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/request-password");
  };

  return (
    <div className="invalid-token-container">
      <h1>Invalid Token</h1>
      <h4>The token to reset your password is invalid or has expired.</h4>
      <p>
        Request a new password reset link or contact support for further
        assistance.
      </p>
      <Button className="invalid-token-button" onClick={handleGoBack}>
        Request new password
      </Button>
    </div>
  );
};

export default InvalidTokenPage;
