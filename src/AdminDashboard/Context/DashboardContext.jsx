import { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <DashboardContext.Provider
      value={{
        page,
        setPage,
        search,
        setSearch,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
