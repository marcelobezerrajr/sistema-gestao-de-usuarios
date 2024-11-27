import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Ops! A página que você procura não existe.</p>
      <button className="custom-button" onClick={handleGoHome}>Voltar para página inicial</button>
    </div>
  );
};

export default NotFoundPage;
