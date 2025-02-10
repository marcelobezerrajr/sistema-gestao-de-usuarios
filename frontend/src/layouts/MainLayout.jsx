import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/MainLayout.css";
import { UsersContext } from "../context/UsersContext";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <UsersContext>
        <NavBar />
        <main className="main-content">{children}</main>
      </UsersContext>
      <Footer />
    </div>
  );
};

export default MainLayout;
