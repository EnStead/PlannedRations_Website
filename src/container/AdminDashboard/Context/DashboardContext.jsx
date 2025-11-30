import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Dummy data for now
  const [stats, setStats] = useState({
    users: 120,
    orders: 75,
    revenue: 5400,
  });

  const [loading, setLoading] = useState(false);

  // Later, you can fetch API data here or with React Query

  return (
    <DashboardContext.Provider value={{ stats, setStats, loading, setLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};
