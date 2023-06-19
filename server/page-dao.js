const sqlite3 = require('sqlite3').verbose();

// Database connection
const db = new sqlite3.Database('cms.sqlite');

// Page Data Access Object (DAO)
const PageDAO = {
  // Get all pages
  getAllPages: (callback) => {
    const query = 'SELECT * FROM Pages ORDER BY created_at DESC';

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },

  // Get a page by ID
  getPageById: (id, callback) => {
    const query = 'SELECT * FROM Pages WHERE id = ?';

    db.get(query, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },

  // Create a new page
  createPage: (title, content, callback) => {
    const query = 'INSERT INTO Pages (title, content) VALUES (?, ?)';

    db.run(query, [title, content], function (err) {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, this.lastID);
      }
    });
  },

  // Update a page by ID
  updatePage: (id, title, content, callback) => {
    const query = 'UPDATE Pages SET title = ?, content = ? WHERE id = ?';

    db.run(query, [title, content, id], function (err) {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  // Delete a page by ID
  deletePage: (id, callback) => {
    const query = 'DELETE FROM Pages WHERE id = ?';

    db.run(query, [id], function (err) {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },
};

module.exports = PageDAO;
