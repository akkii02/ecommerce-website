import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
      const initialToken = localStorage.getItem("tokens")
      const initialEmail = localStorage.getItem("email")
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const userLoggedIn = !!token;
  const loginHandler = (token,email) => {
      localStorage.setItem("tokens",token)
      localStorage.setItem("email",email)
      setToken(token)
      setEmail(email)
  };
console.log("email",email)
  const logoutHandler = () => {
      localStorage.removeItem("tokens")
      localStorage.removeItem("email")
      setToken(null)
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail:email,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
