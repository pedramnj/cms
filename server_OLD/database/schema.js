/*
In the User table, we define the following columns:
id: An auto-incrementing integer column serving as the primary key.
username: A text column that must not be null and must be unique, representing the username of the user.
password: A text column that stores the user's password.
isAdmin: An integer column that defaults to 0, indicating whether the user is an admin.
 A value of 1 signifies admin privileges.
In the Page table, we define the following columns:
id: An auto-incrementing integer column serving as the primary key.
title: A text column that must not be null, representing the title of the page.
author: A text column that must not be null, representing the username of the page's author.
creationDate: A datetime column that defaults to the current timestamp, representing the creation date of the page.
publicationDate: A datetime column representing the publication date of the page.
status: A text column that must not be null and defaults to 'draft',
 indicating the status of the page (draft, scheduled, or published).
FOREIGN KEY (author) REFERENCES User(username): A foreign key constraint that references the username 
column in the User table, ensuring referential integrity.
*/

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/database.sqlite');

// Create the User table
db.run(`CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  isAdmin INTEGER DEFAULT 0
)`);

// Create the Page table
db.run(`CREATE TABLE IF NOT EXISTS Page (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  publicationDate DATETIME,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (author) REFERENCES User(username)
)`);

module.exports = db;


