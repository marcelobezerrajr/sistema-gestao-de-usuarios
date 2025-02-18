import api from "./api";

export const verifyResetToken = async (token) => {
  try {
    const response = await api.post("/reset-password/verify", { token });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.detail || "Network error. Please try again later."
    );
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/reset-password/reset", {
      token,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail ||
        "An error occurred while resetting the password. Try again later."
    );
  }
};
