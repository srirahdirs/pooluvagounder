import React, { createContext, useContext, useState, useEffect } from "react";
import config from '../config';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null; // Load from localStorage if available
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("authToken"); // Check if there's a token in localStorage
  });

  // Use effect to persist `user` and `isLoggedIn` to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("authToken", localStorage.getItem("authToken")); // Save authToken (you might update it with actual token)
    } else {
      localStorage.removeItem("authToken");
    }
  }, [isLoggedIn]);


  const apiUrl = config?.apiUrl;
  let fullApiUrl;
  if (apiUrl) {
    fullApiUrl = apiUrl + 'getLoggedInUserProfile';
  } else {
    console.error('Invalid API url');
  }
  const fetchUserFromToken = async (token) => {
    try {
      const response = await fetch(fullApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Update user state with fetched data
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };






  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    fetchUserFromToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
