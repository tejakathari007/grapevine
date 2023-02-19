import React, { useState } from "react";
export const ThemeValue = React.createContext(null);
const ThemeContext = (props) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeValue.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeValue.Provider>
  );
};

export default ThemeContext;
