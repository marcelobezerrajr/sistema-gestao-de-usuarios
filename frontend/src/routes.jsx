import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RequestPasswordPage from "./pages/RequestPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import InvalidTokenPage from "./pages/InvalidTokenPage";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/request-password"
          element={<RequestPasswordPage />}
        />
        <Route exact path="/change-password" element={<ChangePasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/invalid-token" element={<InvalidTokenPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/about" element={<AboutPage />} />
          </Route>
        </Route>
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
