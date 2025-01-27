import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    setToken(local_token);
    if (local_token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
    getUser();
  }, []);

  const login = async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    let responsData = { message: "", status: "" };
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          responsData = result;
          if (result.status) {
            setToken(token);
            localStorage.setItem("token", result.token);
            setUser(result.user);
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          responsData = { message: "Server Error", status: false };
        });
      return responsData;
    } catch (error) {
      return { message: "Server Error", status: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
