import React, { useState, useEffect } from "react";

export const AdminValue = React.createContext(null);

export default function AdminContext({ children }) {
  const [admin, setAdmin] = useState(null);
  useEffect( () => {
    try {
      let loggedAdmin = JSON.parse(localStorage.getItem("admin"));
      if (loggedAdmin) {
        setAdmin({ ...loggedAdmin });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AdminValue.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminValue.Provider>
  );
}
