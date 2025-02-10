import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/MainLayout.css";
import { UsersProvider } from "../context/UsersContext";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <UsersProvider>
        <NavBar />
        <main className="main-content">{children}</main>
      </UsersProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
