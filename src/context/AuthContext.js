import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch {
      return null;
    }
  });

  const [points, setPoints] = useState(() => {
    try {
      const stored = localStorage.getItem('points');
      const parsed = stored ? parseInt(stored, 10) : 0;
      return Number.isNaN(parsed) ? 0 : parsed;
    } catch {
      return 0;
    }
  });

  const login = (userData, tokenValue) => {
    const safeUser = userData || null;

    setUser(safeUser);
    setToken(tokenValue || null);

    try {
      if (tokenValue) {
        localStorage.setItem('token', tokenValue);
      } else {
        localStorage.removeItem('token');
      }

      if (safeUser) {
        localStorage.setItem('user', JSON.stringify(safeUser));
      } else {
        localStorage.removeItem('user');
      }
    } catch {
      // Ignore storage failures (private mode, etc.)
    }
  };

  const logout = () => {
    login(null, null);
    setPoints(0);
    try {
      localStorage.removeItem('points');
    } catch {
      // ignore
    }
  };

  const addPoints = (amount) => {
    if (!amount) return;
    setPoints((prev) => {
      const next = Math.max(0, (prev || 0) + amount);
      try {
        localStorage.setItem('points', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    // In a real app, you might validate the token here.
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    points,
    addPoints,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

