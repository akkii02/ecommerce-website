import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
      const initialToken = localStorage.getItem("tokens")
  const [token, setToken] = useState(initialToken);

  const userLoggedIn = !!token;
  const loginHandler = (token) => {
      localStorage.setItem("tokens",token)
      setToken(token)
  };

  const logoutHandler = () => {
      localStorage.removeItem("tokens")
      setToken(null)
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
