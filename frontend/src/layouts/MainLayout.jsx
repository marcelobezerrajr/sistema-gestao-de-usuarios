import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/MainLayout.css";
import { CustomersProvider } from "../context/CustomersContext";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <CustomersProvider>
        <NavBar />
        <main className="main-content">{children}</main>
      </CustomersProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
