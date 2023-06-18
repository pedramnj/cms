//Component for rendering the form to edit an existing page.
/* the EditPageForm component is a form that allows the user to edit an existing page.
It uses the useParams hook from React Router to retrieve the pageId parameter from the URL, 
which identifies the page to be edited.
It also uses the useState and useEffect hooks to manage the form state and fetch the page data
when the component mounts.
The fetchPage function is an asynchronous function that calls the getPage function
(from the api.js service) to fetch the page data based on the pageId. The fetched data is used to populate
the form fields.
The form has an onSubmit event handler that calls the updatePage function
(from the api.js service) with the pageId, updated title, and content.
If the page update is successful, the user is redirected to the back-office page
(/back-office route). If an error occurs during page update, it is logged to the console for demonstration
purposes. */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPage, updatePage } from '../../services/api';

const EditPageForm = () => {
  const { pageId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch the page data when the component mounts
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      // Call the API to fetch the page data based on the pageId
      const page = await getPage(pageId);
      setTitle(page.title);
      setContent(page.content);
    } catch (error) {
      console.log('Fetch page failed:', error.message);
      // Handle fetch page error (display error message, etc.)
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to update the page with the entered title and content
      await updatePage(pageId, title, content);
      history.push('/back-office'); // Redirect to the back-office page after updating the page
    } catch (error) {
      console.log('Update page failed:', error.message);
      // Handle update page error (display error message, clear form, etc.)
    }
  };

  return (
    <div>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPageForm;
