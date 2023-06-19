// server/models/user.js

const db = require('../database/schema');

// Get user by username
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM User WHERE username = ?';

    db.get(query, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  getUserByUsername,
};
