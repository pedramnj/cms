//Component for rendering the details of a specific page.

/*
The PageDetail component fetches and displays the details of a specific page 
based on the pageId parameter from the URL using the useParams hook.
It uses the useEffect and useState hooks to fetch the page data when the component mounts and store it 
in the page state.
The fetchPage function is an asynchronous function that calls the getPageById function
(from the api.js service) to fetch the page data based on the pageId. The fetched data is stored in the page state.
The component conditionally renders the page details if the page state is not null.
It displays the page title, author, publication date, and the content blocks of the page.
The content blocks are rendered based on their type, either as a header (h3), paragraph (p), or image (img).
If the page state is null, it displays a "Loading page..." message. */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageById } from '../../services/api';

const PageDetail = () => {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const pageData = await getPageById(pageId);
      setPage(pageData);
    } catch (error) {
      console.log('Fetch page failed:', error.message);
      // Handle fetch page error (display error message, etc.)
    }
  };

  return (
    <div>
      {page ? (
        <div>
          <h2>{page.title}</h2>
          <p>Author: {page.author}</p>
          <p>Publication Date: {page.publicationDate}</p>
          <div>
            {page.blocks.map((block, index) => (
              <div key={index}>
                {block.type === 'header' && <h3>{block.content}</h3>}
                {block.type === 'paragraph' && <p>{block.content}</p>}
                {block.type === 'image' && <img src={block.src} alt="" />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading page...</p>
      )}
    </div>
  );
};

export default PageDetail;
