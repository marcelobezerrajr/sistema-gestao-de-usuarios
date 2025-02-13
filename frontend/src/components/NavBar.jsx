import React, { useState, useEffect, useRef } from "react";
import { Navbar, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaUsers,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";
import useUser from "../hooks/useUser";
import logo from "../assets/logo_marcelo_developer.png";
import "../styles/navbar.css";

const NavBar = () => {
  const { users } = useUser();
  const [userUsername, setUserUsername] = useState("Username");
  const [userEmail, setUserEmail] = useState("Email");
  const [userPermission, setUserPermission] = useState("Permission");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setUserUsername(localStorage.getItem("user_username") || "Username");
    setUserEmail(localStorage.getItem("user_email") || "Email");
    setUserPermission(localStorage.getItem("user_permission") || "Permission");
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInitials = (username) => username?.charAt(0).toUpperCase() || "U";

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    ["access_token", "user_permission", "user_username", "user_email"].forEach(
      (item) => localStorage.removeItem(item)
    );
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <div className="navbar-left">
        <Link to="/users">
          <img
            src={logo}
            alt="Logo Marcelo Developer"
            className="navbar-logo"
          />
        </Link>
        <span>User Management System</span>
      </div>

      {isMobile && (
        <div className="menu-dropdown-container" ref={menuRef}>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <Link
                to="/users"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="icon" /> Home
              </Link>
              <Link
                to="/about"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle className="icon" /> About
              </Link>
              {users?.length > 0 && (
                <div className="dropdown-item-number-users">
                  <FaUsers className="icon" /> Number of Users: {users.length}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Links normais para telas grandes */}
      {!isMobile && (
        <nav className="navbar-nav">
          <Link to="/users">Home</Link>
          <Link to="/about">About</Link>
          {users?.length > 0 && (
            <Badge className="custom-badge">
              <FaUsers className="fa-users" />
              Number of Users: {users.length}
            </Badge>
          )}
        </nav>
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
              {userPermission && <p>{userPermission}</p>}
            </div>
            <hr />
            <NavDropdown.Item as={Link} to="/profile">
              <FaUser className="me-2" /> Profile
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
