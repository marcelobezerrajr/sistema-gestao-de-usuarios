import React, { useState } from "react";
import { Form, Card, Alert, Spinner, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo_marcelo_desenvolvedor.png";
import useLogin from "../hooks/useLogin";
import "../styles/LoginPage.css";
import "../styles/vars.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, loading, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="logo">
          <img src={logo} alt="Logo Marcelo Desenvolvedor" />
        </div>
        <Card className="login-card">
          <Card.Header className="login-card-header">
            <h4>Login</h4>
          </Card.Header>
          <Card.Body className="login-card-body">
            {error && (
              <Alert className="login-alert" variant="danger">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className="login-form-label">Email</Form.Label>
                <div className="login-email-container">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleChange}
                    className="login-form-control"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="login-form-label">Senha</Form.Label>
                <div className="login-password-container">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="login-form-control"
                    required
                  />
                  <Button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
                <div className="forgot-password">
                  <a href="/request-password">Esqueceu a senha?</a>
                </div>
              </Form.Group>

              <Button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Carregando...</span>
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
