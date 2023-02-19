import React, { useState, useEffect } from "react";
export const RegisterData = React.createContext(null);

const RegisterContext = (props) => {
  const [registerData, setRegisterData] = useState({
    data: true,
    intrests: [],
  });

  useEffect(() => {
    console.log("data", registerData);
  }, [registerData]);
  return (
    <RegisterData.Provider value={[registerData, setRegisterData]}>
      {props.children}
    </RegisterData.Provider>
  );
};

export default RegisterContext;
