/*
comparePasswords: This function compares a plain text password with a hashed password using bcrypt.
compare function. It returns a promise that resolves to a boolean indicating whether the passwords match.
findUserByUsername: This function retrieves a user from the database by their username
 using the getUserByUsername function from the user model. It returns a promise that resolves to the user object.
You can use these utility functions in your authentication logic to compare passwords and find users
 by their usernames.
*/

// server/utils/authentication.js

const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../models/user');

// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Function to find a user by username
const findUserByUsername = async (username) => {
  return await getUserByUsername(username);
};

module.exports = {
  comparePasswords,
  findUserByUsername,
};
