// authMiddleware.js

// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if the user is logged in
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the next middleware
      return next();
    }
  
    // User is not authenticated, redirect to the login page or send an error response
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  module.exports = { isAuthenticated };
  