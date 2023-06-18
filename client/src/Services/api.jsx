//Service for making HTTP requests to the server's API endpoints
/*
The getPublishedPages function fetches all published pages from the server.
The getPageById function fetches a specific page by its ID from the server.
The createPage function sends a POST request to the server to create a new page.
The updatePage function sends a PUT request to the server to update a page by its ID.
The deletePage function sends a DELETE request to the server to delete a page by its ID.
The getImages function fetches the preloaded images from the server.
*/

// api.js

// API endpoint URLs
const API_BASE_URL = 'http://localhost:3001/api';
const PAGES_URL = `${API_BASE_URL}/pages`;
const IMAGES_URL = `${API_BASE_URL}/images`;

// Fetch all published pages
export const getPublishedPages = async () => {
  try {
    const response = await fetch(`${PAGES_URL}?status=published`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch published pages');
  }
};

// Fetch a page by ID
export const getPageById = async (pageId) => {
  try {
    const response = await fetch(`${PAGES_URL}/${pageId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch page');
  }
};

// Create a new page
export const createPage = async (pageData) => {
  try {
    const response = await fetch(PAGES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to create page');
  }
};

// Update a page by ID
export const updatePage = async (pageId, pageData) => {
  try {
    const response = await fetch(`${PAGES_URL}/${pageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update page');
  }
};

// Delete a page by ID
export const deletePage = async (pageId) => {
  try {
    await fetch(`${PAGES_URL}/${pageId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Failed to delete page');
  }
};

// Fetch preloaded images
export const getImages = async () => {
  try {
    const response = await fetch(IMAGES_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};
