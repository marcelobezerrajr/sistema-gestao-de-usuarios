import React, { useState, useEffect } from "react";
import {
  Card,
  Spinner,
  Alert,
  Form,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/User/AddUserPage.css";

const AddUserPage = () => {
  const { addUser } = useUser();
  const [usuarioData, setUsuarioData] = useState({
    username: "",
    name: "",
    last_name: "",
    email: "",
    hashed_password: "",
    telephone: "",
    permission: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [userPermission, setUserPermission] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const permission = localStorage.getItem("user_permission");
    setUserPermission(permission || "");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData({
      ...usuarioData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: null });
  };

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

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(value) ? "Invalid email format." : null;
  };

  const validateTelephone = (value) => {
    const pattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return !pattern.test(value)
      ? "Invalid telephone format. Use (DD) 9XXXX-XXXX or DD9XXXXXXX."
      : null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!usuarioData.username) newErrors.username = "Username is mandatory";
    if (!usuarioData.name) newErrors.name = "Name is mandatory";
    if (!usuarioData.last_name) newErrors.last_name = "last name is mandatory";
    if (!usuarioData.permission)
      newErrors.permission = "Type of Permission is mandatory";

    const passwordError = validatePassword(usuarioData.hashed_password);
    if (passwordError) newErrors.hashed_password = passwordError;

    const emailError = validateEmail(usuarioData.email);
    if (emailError) newErrors.email = emailError;

    const telephoneError = validateTelephone(usuarioData.telephone);
    if (telephoneError) newErrors.telephone = telephoneError;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    if (userPermission !== "Admin" && usuarioData.permission === "Admin") {
      setErrors({
        permission: "Você não tem permissão para atribuir o nível Admin.",
      });
      setLoading(false);
      return;
    }

    try {
      await addUser({
        ...usuarioData,
        hashed_password: usuarioData.hashed_password,
      });
      setSuccess("Usuário adicionado com sucesso!");
      setUsuarioData({
        username: "",
        name: "",
        last_name: "",
        email: "",
        hashed_password: "",
        telephone: "",
        permission: "",
      });
    } catch (error) {
      setErrors({ form: "Erro ao adicionar o usuário. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const getPermissionOptions = () => {
    if (userPermission === "Admin") {
      return (
        <>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Read">Read</option>
        </>
      );
    }
    return (
      <>
        <option value="User">User</option>
        <option value="Read">Read</option>
      </>
    );
  };

  return (
    <MainLayout>
      <div className="add-user-div">
        <Container className="add-user-container">
          <Row className="justify-content-md-center">
            <Col md={12} lg={10}>
              <Card className="add-user-card">
                <Card.Header className="add-user-card-header">
                  <h4>
                    <b>+</b> Add User
                  </h4>
                </Card.Header>
                <Card.Body className="add-user-card-body">
                  {loading && (
                    <div className="add-user-spinner">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {errors.form && (
                    <Alert variant="danger" className="add-user-alert-error">
                      {errors.form}
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="success" className="add-user-alert-success">
                      {success}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <div className="add-user-form-grid">
                      <Form.Group
                        className="add-user-form-group"
                        controlId="username"
                      >
                        <Form.Label className="add-user-form-label">
                          Username
                        </Form.Label>
                        <Form.Control
                          className="add-user-form-control-custom"
                          type="text"
                          name="username"
                          value={usuarioData.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                          placeholder="Enter username"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group"
                        controlId="name"
                      >
                        <Form.Label className="add-user-form-label">
                          Name
                        </Form.Label>
                        <Form.Control
                          className="add-user-form-control-custom"
                          type="text"
                          name="name"
                          value={usuarioData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          placeholder="Enter name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group"
                        controlId="last_name"
                      >
                        <Form.Label className="add-user-form-label">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          className="add-user-form-control-custom"
                          type="text"
                          name="last_name"
                          value={usuarioData.last_name}
                          onChange={handleChange}
                          isInvalid={!!errors.last_name}
                          placeholder="Enter last name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.last_name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group"
                        controlId="email"
                      >
                        <Form.Label className="add-user-form-label">
                          Email
                        </Form.Label>
                        <Form.Control
                          className="add-user-form-control-custom"
                          type="text"
                          name="email"
                          value={usuarioData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder="Enter email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group"
                        controlId="hashed_password"
                      >
                        <Form.Label className="add-user-form-label">
                          Password
                        </Form.Label>
                        <div className="add-user-password-container">
                          <Form.Control
                            className="add-user-form-control-custom"
                            type={showPassword ? "text" : "password"}
                            name="hashed_password"
                            value={usuarioData.hashed_password}
                            onChange={handleChange}
                            isInvalid={!!errors.hashed_password}
                            placeholder="Enter password"
                            required
                          />
                          <button
                            type="button"
                            className="add-user-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          <Form.Control.Feedback type="invalid">
                            {errors.hashed_password}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group"
                        controlId="telephone"
                      >
                        <Form.Label className="add-user-form-label">
                          Telephone
                        </Form.Label>
                        <Form.Control
                          className="add-user-form-control-custom"
                          type="tel"
                          name="telephone"
                          value={usuarioData.telephone}
                          onChange={handleChange}
                          isInvalid={!!errors.telephone}
                          placeholder="Enter telephone"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.telephone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="add-user-form-group full-width"
                        controlId="permission"
                      >
                        <Form.Label className="add-user-form-label">
                          Permission
                        </Form.Label>
                        <Form.Select
                          className="add-user-form-select"
                          name="permission"
                          value={usuarioData.permission}
                          onChange={handleChange}
                          isInvalid={!!errors.permission}
                          required
                        >
                          <option value="">Select user permission</option>
                          {getPermissionOptions()}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.permission}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="button-container">
                      <Button
                        className="add-user-button-container"
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        <FaSave className="me-2" />
                        {loading ? "Salvando..." : " Salvar Usuário"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default AddUserPage;
