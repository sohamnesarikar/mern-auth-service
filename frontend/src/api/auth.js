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

export const getUserApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/auth/me");
    return res;
  } catch (error) {
    throw error;
  }
};
