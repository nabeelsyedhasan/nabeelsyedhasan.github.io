export const handleLogout = (navigate, onLogout) => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Call the onLogout function passed as prop
    onLogout();
    // Redirect to the login page
    navigate('/home')();
  };
  
  export const handleLogin = (navigate) => {
    // Redirect to the login page
    navigate('/login');
  };