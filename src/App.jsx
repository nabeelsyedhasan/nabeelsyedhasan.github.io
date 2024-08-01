import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import LogoutButton from './logout'; 
import Cart from './Components/Cart'
import Checkout from './Components/Checkout';
import Success from './Components/Success';
import RazorpayPage from './Components/RazorpayPage';
import ContactUs from './ContactUs';
import AboutUs from './aboutus'
import Orders from './Components/Orders';
import './index.css'
import "../public/Foodzilla1.png"



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
  };
  

  return (
   
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container">
      <Link to="/home" className="navbar-brand">
        <img src="Foodzilla1.png" alt="Foodzilla Logo" width="100" height="30" />
      </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </li>
      </ul>
      {isLoggedIn && (
              <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">Cart</Link>
                </li>
                <li className="nav-item">
                <Link to="/orders" className="nav-link">Orders</Link>
                </li>
              </ul>
            )}
      <form className="d-flex">
        <LogoutButton isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </form>
    </div>
  </div>
</nav>

      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/online" element={<RazorpayPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/orders" element={<Orders/>} />
        
      </Routes>
      <footer className="footer bg-dark text-center text-white">
        <div className="container p-0">
          Foodzilla © - All rights reserved 2024
        </div>
        
      </footer>
    </Router>
    
  );
}

export default App;