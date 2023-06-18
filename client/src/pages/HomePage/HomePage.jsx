// Component representing the homepage of the application
/*
the HomePage component that fetches the published pages using the fetchPages function when the component mounts.
The component uses the useState hook to manage the state of the pages array. 
The useEffect hook is used to fetch the published pages when the component mounts.
The fetchPages function makes an API request to fetch the published pages using the getPublishedPages function 
(from the api.js service). It updates the pages state with the fetched data.
The component then renders the list of published pages. If there are published pages, 
it renders an unordered list (<ul>) with each page as a list item (<li>). 
Each page is rendered as a link (<Link>) that navigates to the respective page detail using the page ID in the URL.
If there are no published pages, it displays a message indicating that no published pages are found.
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPages } from '../../services/api';

const HomePage = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const publishedPages = await getPublishedPages();
      setPages(publishedPages);
    } catch (error) {
      console.log('Fetch pages failed:', error.message);
      // Handle fetch pages error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <h3>Published Pages</h3>
      {pages.length > 0 ? (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link to={`/pages/${page.id}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No published pages found.</p>
      )}
    </div>
  );
};

export default HomePage;
