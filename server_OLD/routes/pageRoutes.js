// server/routes/pageRoutes.js
/*
/pages: Handles the GET request to retrieve all pages. Only authenticated users can access this route.
/pages/:id: Handles the GET request to retrieve a specific page by its ID.
 Only authenticated users can access this route.
/pages: Handles the POST request to create a new page. 
Only admin users can access this route.
/pages/:id: Handles the PUT request to update a page by its ID.
 Only admin users can access this route.
/pages/:id: Handles the DELETE request to delete a page by its ID. 
Only admin users can access this route.
These routes utilize the isAuthenticated and isAdminAuthenticated middlewares 
to ensure that only authenticated and authorized users can access the corresponding routes.
*/

const express = require('express');
const { isAuthenticated, isAdminAuthenticated } = require('../middlewares/authMiddleware');
const { getAllPages, getPageById, createPage, updatePage, deletePage } = require('../controllers/pageController');

const router = express.Router();

// Get all pages
router.get('/pages', isAuthenticated, getAllPages);

// Get a page by ID
router.get('/pages/:id', isAuthenticated, getPageById);

// Create a new page
router.post('/pages', isAdminAuthenticated, createPage);

// Update a page
router.put('/pages/:id', isAdminAuthenticated, updatePage);

// Delete a page
router.delete('/pages/:id', isAdminAuthenticated, deletePage);

module.exports = router;
