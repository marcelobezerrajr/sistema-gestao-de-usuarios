import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyResetToken,
  resetPassword,
} from "../services/resetPasswordService";

export const ResetPasswordContext = createContext();

export const ResetPasswordProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    setLoading(true);
    try {
      await verifyResetToken(token);
      setFeedback({ message: "Token válido", error: false });
    } catch (error) {
      setFeedback({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    setLoading(true);
    setFeedback({ message: "", error: false });
    try {
      await resetPassword(token, newPassword);
      setFeedback({
        message: "Your password has been successfully reset.",
        error: false,
      });
      navigate("/login");
    } catch (error) {
      setFeedback({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordContext.Provider
      value={{ feedback, loading, verifyToken, handleResetPassword }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};
