import React, { useContext } from "react";
import { RegisterData } from "../Context/RegisterContext";
import { ThemeValue } from "../Context/ThemeContext";
import { UserValue } from "../Context/UserContext";

export default function ContextHook() {
  const [user, setUser] = useContext(UserValue);
  const [theme, setTheme] = useContext(ThemeValue);
  const [registerData, setRegisterData] = useContext(RegisterData);
  return {
    user,
    setUser,
    theme,
    setTheme,
    registerData,
    setRegisterData,
  };
}
