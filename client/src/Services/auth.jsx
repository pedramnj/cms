//Service for handling user authentication and session management

/*
the auth.js file contains three authentication functions:
The login function sends a POST request to the server's /api/login endpoint with the provided credentials.
It expects a response from the server containing authentication-related data.
The logout function sends a POST request to the server's /api/logout endpoint to log the user out.
It expects a response from the server indicating a successful logout.
The checkAuth function sends a GET request to the server's /api/checkAuth endpoint to check
if the user is authenticated. It expects a response from the server containing authentication-related data.
These functions utilize the fetch API to make the actual HTTP requests to the server and handle the responses 
accordingly. If an error occurs during the API requests, it throws an Error object with an appropriate error message.
*/
// Login
export const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to login');
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to logout');
    }
  };
  
  // Check if user is authenticated
  export const checkAuth = async () => {
    try {
      const response = await fetch('/api/checkAuth');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to check authentication');
    }
  };
  