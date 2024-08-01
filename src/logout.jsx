import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogoutButton() {
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
    // Redirect to the login page
    history('/home');
  };

  const handleLogin = () => {
    // Redirect to the login page
    history('/login');
 };

  return (
    <div>
      {isLoggedIn ? (
        <button className = "btn btn-outline-danger" onClick={handleLogout}>  Logout</button>
      ) : (
        <button className = "btn btn-outline-success" onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default LogoutButton;