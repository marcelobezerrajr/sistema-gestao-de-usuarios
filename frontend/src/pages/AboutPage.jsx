import React from "react";
import MainLayout from "../layouts/MainLayout";
import "../styles/about-page.css";
import {
  FaUserPlus,
  FaEdit,
  FaSearch,
  FaTrashAlt,
  FaShieldAlt,
  FaRocket,
  FaMobileAlt,
  FaChartLine,
} from "react-icons/fa";

const About = () => {
  return (
    <MainLayout>
      <div className="about-container">
        <header className="about-header">
          <h1 className="about-title">User Management System</h1>
          <p className="about-intro">
            An innovative platform to efficiently and securely manage users.
          </p>
        </header>

        <section className="about-section features-section">
          <h2 className="about-subtitle">Key Features</h2>
          <div className="about-features">
            <div className="feature-item">
              <FaUserPlus className="feature-icon" />
              <h3>User Creation</h3>
              <p>Quickly register new users.</p>
            </div>
            <div className="feature-item">
              <FaEdit className="feature-icon" />
              <h3>Editing</h3>
              <p>Update user information in real-time.</p>
            </div>
            <div className="feature-item">
              <FaSearch className="feature-icon" />
              <h3>Search</h3>
              <p>View and manage users easily.</p>
            </div>
            <div className="feature-item">
              <FaTrashAlt className="feature-icon" />
              <h3>Deletion</h3>
              <p>Safely and securely remove users.</p>
            </div>
          </div>
        </section>

        <section className="about-section differials-section">
          <h2 className="about-subtitle">System Differentials</h2>
          <div className="about-differentials">
            <div className="differential-item">
              <FaRocket className="differential-icon" />
              <h3>High Performance</h3>
              <p>Fast and efficient loading.</p>
            </div>
            <div className="differential-item">
              <FaShieldAlt className="differential-icon" />
              <h3>Security</h3>
              <p>Advanced protection for sensitive data.</p>
            </div>
            <div className="differential-item">
              <FaMobileAlt className="differential-icon" />
              <h3>Responsive</h3>
              <p>Works perfectly on any device.</p>
            </div>
            <div className="differential-item">
              <FaChartLine className="differential-icon" />
              <h3>Scalability</h3>
              <p>Ready to grow with your business.</p>
            </div>
          </div>
        </section>

        <section className="about-section tech-section">
          <h2 className="about-subtitle">Technologies Used</h2>
          <p className="about-text">
            The system is developed with <strong>React.js</strong>,{" "}
            <strong>Python</strong>, and <strong>Postgres</strong>, ensuring a
            modern, scalable, and reliable architecture for any application.
          </p>
        </section>

        <section className="about-section developer-section">
          <h2 className="about-subtitle">About the Developer</h2>
          <p className="about-text">
            Created by <strong>Marcelo Developer</strong>, a specialist in
            FullStack Development and scalable solutions. If you need support or
            customizations, feel free to reach out.
          </p>
          <div className="contact-section">
            <p>
              ✉️ Email:{" "}
              <a href="mailto:marcelojuniorbzerra12@gmail.com">
                marcelojuniorbzerra12@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Try the System Today!</h2>
          <p className="cta-text">Contact us for a demo or more information.</p>
          <a
            href="mailto:marcelojuniorbzerra12@gmail.com"
            className="cta-button"
          >
            Request a Demo
          </a>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
