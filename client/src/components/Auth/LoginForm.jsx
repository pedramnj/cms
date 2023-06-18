//Component for rendering the login form.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/auth';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      history.push('/back-office'); // Redirect to the back-office page on successful login
    } catch (error) {
      console.log('Login failed:', error.message);
      // Handle login error (display error message, clear form, etc.)
    }
  };

  return (
    <div className="login-form">
    <h2 className="login-form-title">Login</h2>
    <form onSubmit={handleSubmit} className="login-form-container">
      <div>
        <label htmlFor="username" className="login-form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="login-form-input"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="login-form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="login-form-input"
          required
        />
      </div>
      <button type="submit" className="login-form-button">
        Login
      </button>
    </form>
  </div>
);
};


export default LoginForm;


/*the LoginForm component is a simple form that allows users to enter their username and password.
 It uses the useState hook to manage the form state, and the useHistory hook from React Router to 
 handle navigation after a successful login.
The form has an onSubmit event handler that calls the login function
 (from the auth.js service) with the entered username and password. If the login is successful,
  the user is redirected to the back-office page (/back-office route).
 If an error occurs during login, it is logged to the console for demonstration purposes. */