import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvier = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      inputs
    );
    if (res.data) {
      setCurrentUser(res.data);
    }
    return res;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ login, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
