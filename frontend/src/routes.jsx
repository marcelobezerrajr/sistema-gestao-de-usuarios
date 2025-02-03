import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RequestPasswordPage from "./pages/RequestPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import InvalidTokenPage from "./pages/InvalidTokenPage";
import PrivateRoute from "./components/PrivateRoute";

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
        <Route exact path="/invalid-token" element={<InvalidTokenPage />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/about" element={<AboutPage />} />
        </Route>
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
