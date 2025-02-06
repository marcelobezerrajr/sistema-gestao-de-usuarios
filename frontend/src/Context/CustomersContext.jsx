import React, { useState, createContext } from "react";

export const CustomersContext = createContext();

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState({ data: [] });

  return (
    <CustomersContext.Provider value={[customers, setCustomers]}>
      {children}
    </CustomersContext.Provider>
  );
};
