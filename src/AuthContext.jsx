import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('protinut_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(user);

  const login = (userData) => {
    const formattedUser = {
      name: userData.name || 'Protinut Member',
      email: userData.email || userData.identifier || 'member@protinut.in',
      phone: userData.phone || '+91 98765 43210',
      identifier: userData.identifier || userData.email || 'member@protinut.in',
      avatar: userData.avatar || (userData.name ? userData.name.charAt(0).toUpperCase() : 'P'),
      joinedAt: userData.joinedAt || 'Oct 2026'
    };
    setUser(formattedUser);
    try {
      localStorage.setItem('protinut_user', JSON.stringify(formattedUser));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
    return formattedUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('protinut_user');
    } catch (e) {
      console.error('Error clearing user from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
