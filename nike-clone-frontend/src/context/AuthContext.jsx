// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Inicializa o estado lendo do localStorage (lembra o usuário entre sessões)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );

  // 1. Função de Login
  const login = (userInfo) => {
    setUser(userInfo);
    // Salva no localStorage para persistência
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
  };

  // 2. Função de Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};