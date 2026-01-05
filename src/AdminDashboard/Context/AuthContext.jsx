import { createContext, useContext, useEffect, useState } from "react";
import api from "../../Utility/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetData, setResetData] = useState(null);

  const setPasswordResetData = (data) => {
    setResetData(data);
  };

  const clearResetData = () => {
  setResetData(null);
};


  // Load auth from storage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post("/admin/login", {
      email,
      password,
    });

    const { token, admin } = res.data.data;

    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(admin));

    setToken(token);
    setUser(admin);

    return res.data; // 👈 return response data
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setUser(null);
    setToken(null);
  };

  const forgotPassword = async (email) => {
  try {
    const res = await api.post("/admin/forgot-password", { email });
    return res.data; // returns { success, message, data }
  } catch (err) {
    throw err;
  }
};

  // RESET PASSWORD
  const resetPassword = async (payload) => {
    const res = await api.post("/admin/reset-password", payload);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
        forgotPassword,
        resetPassword,
        resetData,
        setPasswordResetData,
        clearResetData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
