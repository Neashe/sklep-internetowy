import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      'Content-Type': 'application/json',
    },
  });

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
    const [userRole, setUserRole] = useState(null);
  
    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const response = await api.get('user/type', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          });
          setUserRole(response.data);
          setLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };

      const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
          console.log("haha");
            fetchUserRole();
        } 
        else{
          setUserRole(null);
        }
    }, [isLoggedIn]);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, userRole }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return useContext(AuthContext);
};