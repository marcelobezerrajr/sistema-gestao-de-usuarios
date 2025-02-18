import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RequestPasswordPage from "./pages/RequestPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserPage from "./pages/User/UserPage";
import AddUserPage from "./pages/User/AddUserPage";
import UpdateUserPage from "./pages/User/UpdateUserPage";
import ViewUserPage from "./pages/User/ViewUserPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import InvalidTokenPage from "./pages/InvalidTokenPage";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/request-password"
          element={<RequestPasswordPage />}
        />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/invalid-token" element={<InvalidTokenPage />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/users" element={<UserPage />} />
          <Route exact path="/user/add" element={<AddUserPage />} />
          <Route
            exact
            path="/user/update/:id_user"
            element={<UpdateUserPage />}
          />
          <Route exact path="/user/view/:id_user" element={<ViewUserPage />} />
          <Route
            exact
            path="/change-password"
            element={<ChangePasswordPage />}
          />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/about" element={<AboutPage />} />
        </Route>
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
