//Component for rendering the login form.
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
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