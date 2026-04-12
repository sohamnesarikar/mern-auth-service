import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserApi } from "../api/auth";

const AuthContext = createContext(null);

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
      setUser(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
