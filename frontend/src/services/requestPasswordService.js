import api from "./api";

const requestPasswordService = async (email) => {
  try {
    const response = await api.post("/reset-password/request", {
      email,
    });

    if (!response || response.status !== 200) {
      throw new Error("Error when requesting password recovery.");
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error(
        error.message || "Unknown error in password recovery service."
      );
    }
  }
};

export default requestPasswordService;
