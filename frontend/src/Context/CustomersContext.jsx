import React, { createContext, useState } from "react";

export const CustomersContext = createContext(null);

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState({ data: [] });

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomersContext.Provider>
  );
};
