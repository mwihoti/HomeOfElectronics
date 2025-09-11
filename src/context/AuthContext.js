'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode instead of jwt-decode

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('In valid token', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        // check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          cookies.remove('token');
          setUser(null)
        } else { 
            setUser(decodedUser);
}      } else {
        cookies.remove('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const decodedUser = decodeToken(token);
    if (decodedUser) {
    setUser(decodedUser);
    cookies.set('token', token, { expires: 30 });
    }
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
