import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const location = useLocation();

  const getAuthTokenFromCookie = async () => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return cookieValue || null;
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/getUserData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getAuthTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log("UserData Response:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return {};
    }
  };

  useEffect(() => {
    console.log("Sayfa değişti:", location.pathname);
    console.log("isLoggedIn:", isLoggedIn);

    const fetchData = async () => {
      const authToken = await getAuthTokenFromCookie();
      if (authToken) {
        setLoggedIn(true);

        // Kullanıcı adını ve diğer kullanıcı verilerini al
        const userData = await fetchUserData();
        if (userData && userData.username) {
          setUsername(userData.username);
        }
      } else {
        setLoggedIn(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isLoggedIn]);

  const login = (token) => {
    setLoggedIn(true);
    setAuthTokenToCookie(token);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(null);
    removeAuthTokenFromCookie();
  };

  const setAuthTokenToCookie = (token) => {
    document.cookie = `authToken=${token}; path=/`;
  };

  const removeAuthTokenFromCookie = () => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
