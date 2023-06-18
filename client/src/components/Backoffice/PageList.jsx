//Component for rendering the list of all pages.
/*the PageList component fetches and displays a list of all pages. 
It uses the useEffect and useState hooks to fetch the page data
when the component mounts and store it in the pages state.
The fetchPages function is an asynchronous function that calls the getPages function 
(from the api.js service) to fetch the list of pages. 
The fetched data is stored in the pages state array.
The component renders a title and an unordered list (ul) to display the pages. 
Each page is rendered as a list item (li) with a link (Link from React Router) to the corresponding edit page. 
The page.id is used as the key for the list item and the page.title is displayed as the link text. */


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPages } from '../../services/api';

const PageList = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const pagesData = await getPages();
      setPages(pagesData);
    } catch (error) {
      console.log('Fetch pages failed:', error.message);
      // Handle fetch pages error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>All Pages</h2>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <Link to={`/back-office/edit/${page.id}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageList;


