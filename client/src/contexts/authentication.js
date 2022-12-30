import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token;
  });
  const { performFetch, isLoading, error } = useFetch("/user", (data) =>
    setUser(data?.user)
  );

  useEffect(() => {
    if (token) {
      performFetch({
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logout,
        setUser: setUser,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
