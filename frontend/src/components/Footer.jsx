import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Marcelo Developer. All rights reserved.
      </p>
      <p>Empowering companies with innovative technology solutions.</p>
    </footer>
  );
};

export default Footer;
