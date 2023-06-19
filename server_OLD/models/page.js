// server/models/pages.js

/*
getAllPages: Retrieves all pages from the Page table, ordered by publication date in descending order.
getPageById: Retrieves a specific page from the Page table based on the provided ID.
createPage: Creates a new page in the Page table with the given title, author, publication date, and status.
updatePage: Updates an existing page in the Page table with the specified ID, 
updating the title, publication date, and status.
deletePage: Deletes a page from the Page table based on the provided ID.
These functions use the db object from the schema.js file to execute raw SQL queries 
and interact with the SQLite database.
*/

const db = require('../database/schema');

// Get all pages
const getAllPages = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Page ORDER BY publicationDate DESC';

    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Get a page by ID
const getPageById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Page WHERE id = ?';

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Create a new page
const createPage = (title, author, publicationDate, status) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO Page (title, author, publicationDate, status) VALUES (?, ?, ?, ?)';

    db.run(query, [title, author, publicationDate, status], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Update a page by ID
const updatePage = (id, title, publicationDate, status) => {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE Page SET title = ?, publicationDate = ?, status = ? WHERE id = ?';

    db.run(query, [title, publicationDate, status, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

// Delete a page by ID
const deletePage = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Page WHERE id = ?';

    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
};
