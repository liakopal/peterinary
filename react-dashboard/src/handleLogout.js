// handleLogout.js
export const handleLogout = async (logoutCallback) => {
  try {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(`Initiating logout for user: ${user ? user.username : 'Unknown user'}`);
    
    await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    // Assuming the logout was successful
    console.log(`${user ? user.username : 'Guest'} logged out. Goodbye!`);


    logoutCallback();
    localStorage.removeItem('user');
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
  }
};

