import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/not-found-page.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <button className="not-found-button" onClick={handleGoHome}>
        Return to home page
      </button>
    </div>
  );
};

export default NotFoundPage;
