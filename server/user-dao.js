const sqlite3 = require('sqlite3').verbose();

// Database connection
const db = new sqlite3.Database('cms.sqlite');

// User Data Access Object (DAO)
const UserDAO = {
  // Get user by username
  getUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM Users WHERE username = ?';

    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },

  // Create a new user
  createUser: (username, password, callback) => {
    const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';

    db.run(query, [username, password], function (err) {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, this.lastID);
      }
    });
  },
};

module.exports = UserDAO;
