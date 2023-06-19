//Component for rendering the logout button.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/auth';
import './LoginForm.css';

const LogoutButton = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.log('Logout failed:', error.message);
      // Handle logout error (display error message, etc.)
    }
  };

  return (
    <button className="login-form-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;


/*the LogoutButton component is a simple button that triggers the logout action when clicked. 
It uses the useHistory hook from React Router to handle navigation after logout.
The handleLogout function is an asynchronous function that calls the logout function
 (from the auth.js service) to perform the logout action. After successful logout,
  the user is redirected to the homepage (/ route). 
If an error occurs during logout, it is logged to the console for demonstration purposes. */