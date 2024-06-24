'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import cookies from 'js-cookie';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const token = cookies.get('token');

        if (token) {
            setUser({token});
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        cookies.set('token', userData, {expires: 30});
    }

    const logout = () => {
        setUser(userData);
        cookies.remove('token');
    }
  return (
    <div>
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}



export const useAuth = () => useContext(AuthContext)

