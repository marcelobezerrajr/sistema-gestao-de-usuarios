import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Badge,
  NavDropdown,
  Spinner,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { CustomersContext } from "../context/CustomersContext";
import logo from "../assets/logo_marcelo_desenvolvedor.png";
import "../styles/NavBar.css";

function NavBar() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useContext(CustomersContext);
  const [originalCustomers, setOriginalCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("Usuário");
  const [userUsername, setUserUsername] = useState("Username");
  const [userEmail, setUserEmail] = useState(null);
  const [userPermission, setUserPermission] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name") || "Usuário";
    const storedUserUsername =
      localStorage.getItem("user_username") || "Username";
    const storedUserEmail = localStorage.getItem("user_email") || "";
    const storedUserPermission = localStorage.getItem("user_permission") || "";

    setUserName(storedUserName);
    setUserUsername(storedUserUsername);
    setUserEmail(storedUserEmail);
    setUserPermission(storedUserPermission);
  }, []);

  useEffect(() => {
    if (customers.data.length > 0 && originalCustomers.length === 0) {
      setOriginalCustomers(customers.data);
    }
  }, [customers.data, originalCustomers.length]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterCustomer = (e) => {
    e.preventDefault();
    setLoading(true);
    if (search === "") {
      setCustomers({ data: originalCustomers });
    } else {
      const filteredCustomers = originalCustomers.filter(
        (customer) =>
          customer.username &&
          customer.username.toLowerCase().includes(search.toLowerCase())
      );
      setCustomers({ data: filteredCustomers });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_permission");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_email");
    history.push("/login");
  };

  const getInitials = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <Navbar expand="lg" className="marcelo-desenvolvedor-navbar">
      <Navbar.Brand as={Link} to="/customers">
        <img
          src={logo}
          width="110"
          height="70"
          className="d-inline-block align-top"
          alt="Marcelo Desenvolvedor Logo"
        />
        <span>User Management APP</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto align-items-center marcelo-desenvolvedor-nav">
          <Nav.Link as={Link} to="/customers">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>

          <NavDropdown
            title={
              <span className="d-flex align-items-center avatar-link">
                <div className="user-initials-icon">
                  {getInitials(userName)}
                </div>
                <span className="user-info">
                  {userName !== "Usuário" ? userName : userEmail}
                </span>
              </span>
            }
            id="user-nav-dropdown"
            className="custom-user-dropdown"
          >
            <div className="dropdown-user-info">
              <strong>
                {userUsername !== "Username" ? userUsername : userEmail}
              </strong>
              {userEmail && <p>{userEmail}</p>}
            </div>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/changepassword">
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>

          {customers.data.length > 0 && (
            <Badge className="custom-badge ml-2">
              Number of Customers: {customers.data.length}
            </Badge>
          )}
        </Nav>

        <Form
          onSubmit={filterCustomer}
          className="form-inline ml-auto d-flex custom-form"
        >
          {userPermission &&
            (userPermission === "Admin" || userPermission === "User") && (
              <Link
                to="/createcustomer"
                className="btn btn-primary btn-sm mr-2 custom-button"
              >
                Add New Customer
              </Link>
            )}
          <FormControl
            value={search}
            onChange={updateSearch}
            type="text"
            placeholder="Search"
            className="form-control custom-search"
          />
          <Button type="submit" className="btn custom-button-search mr-2">
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Search"
            )}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
