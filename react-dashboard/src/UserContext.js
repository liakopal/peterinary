import React, { createContext, useState, useEffect, useContext  } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    return token ? { token, role } : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [userRole, setUserRole] = useState(user?.role || '');

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(!!user);
    setUserRole(user?.role || '');
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserRole(userData.role);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, userRole, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Uncomment and use this if needed
 export const useUserContext = () => useContext(UserContext);
