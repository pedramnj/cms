//Component for rendering the homepage.
/* the HomePage component fetches and displays the latest published pages on the front-end.
It uses the useEffect and useState hooks to fetch the page data 
when the component mounts and store it in the pages state.
The fetchPublishedPages function is an asynchronous function that calls the getPublishedPages function
(from the api.js service) to fetch the latest published pages. The fetched data is stored in the pages state array.
The component renders the website name, a heading for the latest pages section, and a list of the pages. 
If no pages are available, a message "No pages found." is displayed. Otherwise,
each page is rendered as a list item (li). It displays the page title, author, publication date, 
and the content blocks of the page. The content blocks are rendered based on their type,
either as a header (h5), paragraph (p), or image (img). */

import React, { useEffect, useState } from 'react';
import { getPublishedPages } from '../../services/api';

const HomePage = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchPublishedPages();
  }, []);

  const fetchPublishedPages = async () => {
    try {
      const pagesData = await getPublishedPages();
      setPages(pagesData);
    } catch (error) {
      console.log('Fetch published pages failed:', error.message);
      // Handle fetch published pages error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>Website Name</h2>
      <h3>Latest Pages</h3>
      {pages.length === 0 ? (
        <p>No pages found.</p>
      ) : (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <h4>{page.title}</h4>
              <p>Author: {page.author}</p>
              <p>Publication Date: {page.publicationDate}</p>
              <div>
                {page.blocks.map((block, index) => (
                  <div key={index}>
                    {block.type === 'header' && <h5>{block.content}</h5>}
                    {block.type === 'paragraph' && <p>{block.content}</p>}
                    {block.type === 'image' && <img src={block.src} alt="" />}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
