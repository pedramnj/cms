// server/routes/authRoutes.js
/*
/login: Handles the login route. It uses the passport.authenticate middleware to authenticate the user's credentials. If the authentication is successful, it responds with a JSON message indicating a successful login and the authenticated user object.
/logout: Handles the logout route. It logs out the user and responds with a JSON message indicating a
 successful logout.
/status: Handles the login status route. It checks if the user is authenticated and responds
 with a JSON object indicating the authentication status and, if authenticated, the user object.
/register: Handles the user registration route. It checks if the provided username is already taken,
 hashes the password, and saves the user in the database. For demonstration purposes, it returns the created user in the response.
The file also includes helper functions isAdmin, isAuthenticated, and isAdminAuthenticated for
 checking the user's role and authentication status.
*/
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../models/user');

const router = express.Router();

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

// Login status route
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Helper function to check if a user is an admin
const isAdmin = (user) => {
  return user.role === 'admin';
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware to check if the user is an admin
const isAdminAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && isAdmin(req.user)) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user in the database
    // Replace the following code with your own logic to save the user in the database
    // For demonstration purposes, we're returning the created user
    const createdUser = { username, password: hashedPassword, role: 'user' };
    res.json({ message: 'User registered successfully', user: createdUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
