import axiosInstance from "../config/axios";

export const registerApi = async (data) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/register", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/login", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/auth/logout");
    return res;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenApi = async () => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/refresh");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/auth/me");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const res = axiosInstance.patch("/api/v1/auth/me/update", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/send-otp", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/verify-otp", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/reset-password", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (data) => {
  try {
    const res = await axiosInstance.patch(
      "/api/v1/auth/me/update/avatar",
      data,
    );
    return res;
  } catch (error) {
    throw error;
  }
};
