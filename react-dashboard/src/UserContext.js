// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Check if user info exists in local storage
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     console.log('Found user in local storage, parsing...');
  //     //const parsedUser = JSON.parse(storedUser);
  //     console.log('User loaded from local storage:', storedUser);
  //     setUser(storedUser);
  //   }
  // }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser); // Parse the user from storage
    console.log('User loaded from local storage:', parsedUser);
    setUser(parsedUser);
  }
}, []);
  
  const login = (userData) => {
    console.log('User logging in:', userData);
    localStorage.setItem('user', JSON.stringify({
      _id: userData._id,
      username: userData.username,
      role: userData.role,
    }));
    // Update the user state with the new user data
    setUser({
      _id: userData._id,
      username: userData.username,
      role: userData.role,
    });
    setUser(userData);
  };  

  const logout = () => {
    console.log('User logging out:', user);
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext(null);
