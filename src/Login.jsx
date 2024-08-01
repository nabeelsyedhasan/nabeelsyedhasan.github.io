import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

function Login({ setIsLoggedIn }) {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:3001/login', {email, password})  //using axios to post data
        .then(response => {
            const token = response.data.token;
            const username = response.data.username;
            localStorage.setItem('token', token); //stores token in localstorage
            localStorage.setItem('username', username);

            const verifyToken = (token) => { console.log(jwt_decode(token)); } //Decode the token
            console.log(verifyToken);

            setIsLoggedIn(true); // Update isLoggedIn state to true
            navigate('/home');
        }) 
        .catch(err => {
            if (err.response.status === 401) {
              alert('Wrong password'); // Display error message
            } else {
              console.log(err);
            }
          });
      };
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="on"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                           />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                    </form>
                    <p>Create new account</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Sign-up 
                    </Link>
                
            </div>
        </div>
    
    );
}

// PropTypes validation
Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
  };

export default Login;