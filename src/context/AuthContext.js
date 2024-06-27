'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Ensure the correct import

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        // Token is invalid, remove it
        cookies.remove('token');
      }
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = (userData) => {
    setUser(userData);
    cookies.set('token', userData.token, { expires: 30 });
  };

  const logout = () => {
    setUser(null);
    cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
