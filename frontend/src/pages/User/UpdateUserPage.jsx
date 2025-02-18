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
import { FaSave } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import MainLayout from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";
import "../../styles/User/update-user-page.css";

const UpdateUserPage = () => {
  const { id_user } = useParams();
  const { getUser, updateUserData } = useUser();
  const [userData, setuserData] = useState({
    username: "",
    name: "",
    last_name: "",
    email: "",
    telephone: "",
    permission: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [userPermission, setUserPermission] = useState("");

  useEffect(() => {
    const permission = localStorage.getItem("user_permission");
    setUserPermission(permission || "");
  }, []);

  useEffect(() => {
    if (!id_user) {
      setErrors({ form: "User ID not defined." });
      return;
    }

    const fetchUsuario = async () => {
      setLoading(true);
      try {
        const user = await getUser(id_user);
        if (user) {
          setuserData({ ...user });
        }
      } catch (error) {
        setErrors({ form: "Error loading user data." });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id_user, getUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({
      ...userData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: null });
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
    if (!userData.username) newErrors.username = "Username is mandatory";
    if (!userData.name) newErrors.name = "Name is mandatory";
    if (!userData.last_name) newErrors.last_name = "last name is mandatory";
    if (!userData.permission)
      newErrors.permission = "Type of Permission is mandatory";

    const emailError = validateEmail(userData.email);
    if (emailError) newErrors.email = emailError;

    const telephoneError = validateTelephone(userData.telephone);
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

    if (userPermission !== "Admin" && userData.permission === "Admin") {
      setErrors({
        permission: "You do not have permission to assign the Admin level.",
      });
      setLoading(false);
      return;
    }

    try {
      await updateUserData(id_user, userData);
      setSuccess("User updated successfully!");
      const updatedUser = await getUser(id_user);
      setuserData({ ...updatedUser });
    } catch (error) {
      setErrors({ form: "Error updating user. Try again." });
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
      <div className="update-user-div">
        <Container className="update-user-container">
          <Row className="justify-content-md-center">
            <Col md={12} lg={10}>
              <Card className="update-user-card">
                <Card.Header className="update-user-card-header">
                  <h4>Update User</h4>
                </Card.Header>
                <Card.Body className="update-user-card-body">
                  {loading && (
                    <div className="update-user-spinner">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {errors.form && (
                    <Alert variant="danger" className="update-user-alert-error">
                      {errors.form}
                    </Alert>
                  )}
                  {success && (
                    <Alert
                      variant="success"
                      className="update-user-alert-success"
                    >
                      {success}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <div className="update-user-form-grid">
                      <Form.Group
                        className="update-user-form-group"
                        controlId="username"
                      >
                        <Form.Label className="update-user-form-label">
                          Username
                        </Form.Label>
                        <Form.Control
                          className="update-user-form-control-custom"
                          type="text"
                          name="username"
                          value={userData.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                          placeholder="Enter username"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="update-user-form-group"
                        controlId="name"
                      >
                        <Form.Label className="update-user-form-label">
                          Name
                        </Form.Label>
                        <Form.Control
                          className="update-user-form-control-custom"
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          placeholder="Enter name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="update-user-form-group"
                        controlId="last_name"
                      >
                        <Form.Label className="update-user-form-label">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          className="update-user-form-control-custom"
                          type="text"
                          name="last_name"
                          value={userData.last_name}
                          onChange={handleChange}
                          isInvalid={!!errors.last_name}
                          placeholder="Enter last name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.last_name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="update-user-form-group"
                        controlId="email"
                      >
                        <Form.Label className="update-user-form-label">
                          Email
                        </Form.Label>
                        <Form.Control
                          className="update-user-form-control-custom"
                          type="text"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder="Enter email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="update-user-form-group"
                        controlId="telephone"
                      >
                        <Form.Label className="update-user-form-label">
                          Telephone
                        </Form.Label>
                        <Form.Control
                          className="update-user-form-control-custom"
                          type="tel"
                          name="telephone"
                          value={userData.telephone}
                          onChange={handleChange}
                          isInvalid={!!errors.telephone}
                          placeholder="Enter telephone"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.telephone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="update-user-form-group"
                        controlId="permission"
                      >
                        <Form.Label className="update-user-form-label">
                          Permission
                        </Form.Label>
                        <Form.Select
                          className="update-user-form-select"
                          name="permission"
                          value={userData.permission}
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
                        className="update-user-button-container"
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        <FaSave className="me-2" />
                        {loading ? "Saving..." : " Save User"}
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

export default UpdateUserPage;
