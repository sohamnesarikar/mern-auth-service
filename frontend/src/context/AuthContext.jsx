import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserApi } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await getUserApi();
      if (res.status === 200 && res?.data?.success) {
        setUser(res?.data?.user);
      }
    } catch (error) {
      if (error?.response?.status !== 401) {
        toast.error(error?.response?.data?.message);
      }
      localStorage.removeItem("isLoggedIn");
      setUser(null);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) return;

    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
