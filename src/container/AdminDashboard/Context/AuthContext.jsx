import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Dummy user
  const [user, setUser] = useState({
    name: "Admin User",
    isAdmin: true, // toggle to false to simulate non-admin
  });

  // Optional: login/logout functions
  const login = (newUser) => setUser(newUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the context
export const useAuth = () => useContext(AuthContext);
