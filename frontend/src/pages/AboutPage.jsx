import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo_marcelo_developer.png";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <Container className="about-container">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="about-card">
            <Card.Body>
              <div className="text-center mb-4">
                <Image
                  src={logo}
                  alt="Viper IT Logo"
                  fluid
                  className="viper-logo mb-3"
                />
                <h2>Welcome to Viper IT</h2>
                <p className="lead">
                  Empowering businesses with cutting-edge IT solutions since
                  [Founding Year]
                </p>
              </div>

              <Row className="my-5">
                <Col md={6} className="text-center mission-vision">
                  <h3>Our Mission</h3>
                  <p>
                    At Viper IT, our mission is to provide innovative and
                    reliable IT management solutions that empower businesses to
                    reach their maximum potential.
                  </p>
                </Col>
                <Col md={6} className="text-center mission-vision">
                  <h3>Our Vision</h3>
                  <p>
                    We envision a future where technology effortlessly
                    integrates into business processes, creating seamless
                    operations and driving global progress.
                  </p>
                </Col>
              </Row>

              <Row className="values-section">
                <Col md={4} className="text-center value-card">
                  <div className="value-icon"></div>
                  <h5>Innovation</h5>
                  <p>
                    Constantly pushing boundaries to bring the latest tech
                    solutions.
                  </p>
                </Col>
                <Col md={4} className="text-center value-card">
                  <div className="value-icon"></div>
                  <h5>Excellence</h5>
                  <p>
                    Delivering quality in every solution to ensure our clients
                    succeed.
                  </p>
                </Col>
                <Col md={4} className="text-center value-card">
                  <div className="value-icon"></div>
                  <h5>Integrity</h5>
                  <p>
                    Building trust through transparent and honest practices.
                  </p>
                </Col>
              </Row>

              <Row className="my-5">
                <Col>
                  <h3 className="text-center mb-4">Our Journey</h3>
                  <p>
                    Founded in [Year], Viper IT started with a small team of
                    passionate developers and IT experts dedicated to
                    simplifying IT management for businesses.
                  </p>
                </Col>
              </Row>

              <Row className="text-center my-4 cta-section">
                <Col md={4}>
                  <Button
                    variant="primary"
                    href="/solutions"
                    className="button-custom"
                  >
                    Explore Our Solutions
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-primary"
                    href="/about/team"
                    className="button-custom"
                  >
                    Meet the Team
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-primary"
                    href="/contact"
                    className="button-custom"
                  >
                    Contact Us
                  </Button>
                </Col>
              </Row>

              <Row className="contact-section">
                <Col md={12}>
                  <h3>Get in Touch</h3>
                  <p>
                    Whether you have questions about our services or want to
                    provide feedback, we’re here to help! Reach out to us at{" "}
                    <a href="mailto:support@viperit.com">support@viperit.com</a>{" "}
                    or connect with us on social media.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      href="/contact"
                      className="mx-2 button-custom"
                    >
                      Contact Us
                    </Button>
                    <Button
                      variant="outline-secondary"
                      href="/subscribe"
                      className="mx-2 button-custom"
                    >
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <div className="back-about text-center">
              <Button href="/customers" className="back-button">
                <FontAwesomeIcon icon={faHome} /> Back to Home
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Button href="#" className="scroll-to-top">
        <FontAwesomeIcon icon={faChevronUp} />
      </Button>
    </Container>
  );
};

export default AboutPage;
