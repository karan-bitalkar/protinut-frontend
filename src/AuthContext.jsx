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

  const [adminToken, setAdminToken] = useState(() => {
    try {
      return localStorage.getItem('protinut_admin_token') || null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(user);
  const isAdmin = Boolean(user?.role === 'ROLE_ADMIN' && (adminToken || localStorage.getItem('protinut_admin_token')));

  // Normal Customer Login
  const login = (userData) => {
    const formattedUser = {
      name: userData.name || 'Protinut Member',
      email: userData.email || userData.identifier || 'member@protinut.in',
      phone: userData.phone || '+91 98765 43210',
      identifier: userData.identifier || userData.email || 'member@protinut.in',
      role: userData.role || 'ROLE_CUSTOMER',
      token: userData.token || 'jwt_cust_' + Math.random().toString(36).substring(2),
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

  // Dedicated Admin Login (Spring Boot / Role-based Ready)
  const adminLogin = async (email, password) => {
    // Simulated backend call / dummy validation for testing
    // Spring Boot expects credentials -> returns JWT token + User with ROLE_ADMIN
    const cleanEmail = email.trim().toLowerCase();

    // Check dummy admin credentials
    if (cleanEmail === 'admin@protinut.in' && password === 'admin123') {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.protinut_admin_token_' + Date.now();
      const adminUser = {
        name: 'Super Admin',
        email: 'admin@protinut.in',
        phone: '+91 830 830 2301',
        identifier: 'admin@protinut.in',
        role: 'ROLE_ADMIN',
        token,
        avatar: 'A',
        department: 'Management & Operations',
        joinedAt: 'Jan 2026'
      };

      setUser(adminUser);
      setAdminToken(token);
      try {
        localStorage.setItem('protinut_user', JSON.stringify(adminUser));
        localStorage.setItem('protinut_admin_token', token);
      } catch (e) {
        console.error('Error storing admin session', e);
      }
      return { success: true, user: adminUser, token };
    }

    // Role check simulation: if valid user format but not admin role
    if (cleanEmail.includes('customer') || cleanEmail === 'member@protinut.in') {
      return {
        success: false,
        error: 'Access Denied. You are not an Admin.'
      };
    }

    return {
      success: false,
      error: 'Invalid Admin credentials. (Use admin@protinut.in / admin123)'
    };
  };

  // Normal Logout
  const logout = () => {
    setUser(null);
    setAdminToken(null);
    try {
      localStorage.removeItem('protinut_user');
      localStorage.removeItem('protinut_admin_token');
      localStorage.removeItem('protinut_cart');
      localStorage.removeItem('protinut_wishlist');
      localStorage.removeItem('protinut_orders');
    } catch (e) {
      console.error('Error clearing user from localStorage', e);
    }
  };

  // Dedicated Admin Logout
  const adminLogout = () => {
    setAdminToken(null);
    setUser(null);
    try {
      localStorage.removeItem('protinut_admin_token');
      localStorage.removeItem('protinut_user');
    } catch (e) {
      console.error('Error clearing admin session', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        adminToken,
        login,
        adminLogin,
        logout,
        adminLogout
      }}
    >
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
