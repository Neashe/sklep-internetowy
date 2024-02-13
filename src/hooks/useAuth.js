import React, { createContext, useContext, useState, useEffect } from "react";
import {api_protected} from "../api/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const response = await api_protected.get('user/type', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          });
          setUserRole(response.data);
          setLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setLoggedIn(false);
        }
      };

      const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
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