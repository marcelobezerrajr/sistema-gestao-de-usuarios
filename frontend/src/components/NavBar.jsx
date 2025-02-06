import React, { useState, useEffect, useRef } from "react";
import { Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";
import useUser from "../hooks/useUser";
import logo from "../assets/logo_marcelo_developer.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const { users, setUsers } = useUser();
  const [originalUsers, setOriginalUsers] = useState([]);
  const [userUsername, setUserUsername] = useState("Username");
  const [userEmail, setUserEmail] = useState(null);
  const [userPermission, setUserPermission] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUserUsername(localStorage.getItem("user_username") || "Username");
    setUserEmail(localStorage.getItem("user_email") || "");
    setUserPermission(localStorage.getItem("user_permission") || "");
  }, []);

  useEffect(() => {
    if (users?.data?.length > 0 && originalUsers.length === 0) {
      setOriginalUsers(users.data);
    }
  }, [users]);

  const getInitials = (username) => username?.charAt(0).toUpperCase() || "U";

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    ["access_token", "user_permission", "user_username", "user_email"].forEach(
      (item) => localStorage.removeItem(item)
    );
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo Marcelo Developer" className="navbar-logo" />
        <span>User Management APP</span>
      </div>
      <nav className="navbar-nav">
        <Link to="/users">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      {users?.data?.length > 0 && (
        <Badge className="custom-badge ml-2">
          Number of Users: {users.data.length}
        </Badge>
      )}

      <div className="user-avatar-container" ref={dropdownRef}>
        <span className="avatar-link" onClick={toggleDropdown}>
          <div className="user-initials-icon">{getInitials(userUsername)}</div>
        </span>
        {dropdownOpen && (
          <div className="user-dropdown-menu">
            <div className="dropdown-user-info">
              <strong>
                {userUsername !== "Username" ? userUsername : userEmail}
              </strong>
              {userEmail && <p>{userEmail}</p>}
            </div>
            <hr />
            <NavDropdown.Item as={Link} to="/perfil">
              <FaUser className="me-2" /> Perfil
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/change-password">
              <FaKey className="me-2" /> Change Password
            </NavDropdown.Item>
            <hr />
            <NavDropdown.Item onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </NavDropdown.Item>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default NavBar;
